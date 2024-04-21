import { Table } from "antd"
import { store } from "../store"

function getColumns(values: string[]) {
    return values.map((value) => ({
        key: value,
        dataIndex: value,
        title: value
    }))
}

function getRow(columns: string[], values: string[]) {
    return [{
       [ columns[0]]: values[0],
       [ columns[1]]: values[1]
    }]
}

export function ResultPage() {
    const { backReturnCount, backReturnName } = store

    if (!backReturnCount || !backReturnName) {
        return null
    }

    return (
        <Table columns={getColumns(backReturnName)} dataSource={getRow(backReturnName, backReturnCount)} />
    )
}