import { Button, Divider, Form, Input, message, Radio, Slider, Table } from 'antd';
import { useEffect, useState } from 'react';
import { store } from '../store';
import { useNavigate } from 'react-router-dom';

interface CryptoInfo {
    lastPrice: number;
    lowPrice24h: number;
    highPrice24h: number;
    symbol: string;
    volume24h: number;

    
    // moneyValue: number;
    // riskValue: number; // 
    // timeValue: number; //  
    // backReturnName: string[]; // 
    // backReutrnCount: number[]; // 


}

const COLUMNS = [
    {
        key: "symbol",
        dataIndex: 'symbol',
        title: "Symbol",
    },
    {
        key: "lastPrice",
        dataIndex: 'lastPrice',
        title: "Last Price",
    },
    {
        key: "lowPrice24h",
        dataIndex: 'lowPrice24h',
        title: "Low Price 24h",
    },
    {
        key: "highPrice24h",
        dataIndex: 'highPrice24h',
        title: "High Price 24h",
    },
    {
        key: "volume24h",
        dataIndex: 'volume24h',
        title: "Volume 24h",
    },
]

const transformToTableData = (data: CryptoInfo[]) => {
    return data.map((el) => {
        return {
            symbol: el.symbol,
            lastPrice: el.lastPrice,
            lowPrice24h: el.lowPrice24h,
            highPrice24h: el.highPrice24h,
            volume24h: el.volume24h
        }
    })
}

interface FormValues {
    deposit: string
    level: number
    time: number
}

export function MainPage() {
    const [cryptoInfo, setCryptoInfo] = useState<CryptoInfo[]>([]);
    const [option, setOption] = useState(1)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/cryptoinfo');
                const data = await response.json();
                setCryptoInfo(data);
            } catch (error) {
                console.error("Error fetching crypto info:", error);
            }

        };
        fetchData();
        const interval = setInterval(fetchData, 2000);
        //     
        return () => clearInterval(interval);
    }, []);

    const onFinish = async (values: FormValues) => {
        console.log("ON FINISH", values)
        message.success('Форма отправлена')
        store.setBackReturnName(['1','2']);
        store.setBackReturnCount(['30', '50'])
        navigate('/result')
        const data = await fetch('/url', {
            method: 'POST',
            body: JSON.stringify({
                moneyValue: Number(values.deposit),
                riskValue: values.level,
                timeValue: values.time,
            })
        })
        
    }

    const contents = (
        <Table aria-label="Crypto Info Table" pagination={false} columns={COLUMNS} dataSource={transformToTableData(cryptoInfo)} />
    )

    return (
        <div>
            <h1 id="tabelLabel">Crypto Info</h1>
            <p>Crypto info from Bybit Api in real time</p>
            {cryptoInfo.length > 0 ? contents : <p><em>Loading...</em></p>}
            <Divider />
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="deposit" label="Депозит" rules={[{required: true, message: 'Еблан?'}]}>
                    <Input style={{maxWidth:'100px'}} type='number' />
                </Form.Item>
                <Form.Item name="level" label="Уровень риска" rules={[{required: true, message: 'Еблан?'}]}>
                    <Slider style={{maxWidth:'100px'}} step={1} max={10} min={1} defaultValue={1}  />
                </Form.Item>
                <Form.Item name="time" rules={[{required: true, message: 'Еблан?'}]}>
                    <Radio.Group options={[
                        {label: '1', value: 1},
                        {label: '2', value: 2},
                        {label: '3', value: 3},
                    ]} onChange={(e) => setOption(e.target.value)} value={option} optionType="button" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
