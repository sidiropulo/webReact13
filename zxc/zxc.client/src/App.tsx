import { useEffect, useState } from 'react';
import './App.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

interface CryptoInfo {
    lastPrice: number;
    lowPrice24h: number;
    highPrice24h: number;
    symbol: string;
    volume24h: number;





    moneyValue: number; // ���� �������� ������������
    riskValue: number; // ���������� ����� �� 1 �� 10
    timeValue: number; // �� 1 �� 3 � ����������� �� ���������� ��������, ����� 3 ��������� ������
    backReturnName: string[]; // �������� ������
    backReutrnCount: number[]; // �� ������� % ����� �� ������ �������


}

const COLUMNS = [
    {
        key: "symbol",
        label: "Symbol",
    },
    {
        key: "lastPrice",
        label: "Last Price",
    },
    {
        key: "lowPrice24h",
        label: "Low Price 24h",
    },
    {
        key: "highPrice24h",
        label: "High Price 24h",
    },
    {
        key: "volume24h",
        label: "Volume 24h",
    },
]
function App() {
    const [cryptoInfo, setCryptoInfo] = useState<CryptoInfo[]>([]);

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
        // ������� �������� ��� ��������������� ����������
        return () => clearInterval(interval);
    }, []);

    const contents = (
        <Table aria-label="Crypto Info Table">
            <TableHeader columns={COLUMNS}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody>
                {cryptoInfo.map((info, index) => (
                    <TableRow key={index}>
                        <TableCell>{info.symbol}</TableCell>
                        <TableCell>{info.lastPrice}</TableCell>
                        <TableCell>{info.lowPrice24h}</TableCell>
                        <TableCell>{info.highPrice24h}</TableCell>
                        <TableCell>{info.volume24h}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    return (
        <div>
            <h1 id="tabelLabel">Crypto Info</h1>
            <p>Crypto info from Bybit Api in real time</p>
            {cryptoInfo.length > 0 ? contents : <p><em>Loading...</em></p>}
        </div>
    );
}

export default App;
