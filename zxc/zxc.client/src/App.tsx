import { useEffect, useState } from 'react';
import './App.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const COLUMNS = [
    {
        key: "date",
        label: "Date",
      },
      {
        key: "temperatureC",
        label: "Temp. (C)",
      },
      {
        key: "temperatureF",
        label: "Temp. (F)",
      },
      {
        key: "summary",
        label: "Summary",
      },
]

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        const getData = async() => {
            const response = await fetch('weatherforecast');
            const data = await response.json();
            setForecasts(data)
        }
        setInterval(() => getData(), 1000)
    }, []);

    const contents = (
        <Table aria-label="Example table with dynamic content">
        <TableHeader columns={COLUMNS}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={forecasts}>
          {(item) => (
            <TableRow key={item.date}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
    
    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {forecasts ? contents : <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>}
        </div>
    );
}

export default App;