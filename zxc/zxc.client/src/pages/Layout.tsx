import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <Layout>
            <Header style={{
                background: 'white'
            }}>
                This is header
            </Header>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    )
}