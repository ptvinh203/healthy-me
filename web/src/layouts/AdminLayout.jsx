import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function AdminLayout() {
    return (
        <Layout
            style={{
                background: "#E3EEFF",
                margin: "0px",
                width: "100%",
                height: "100%",
            }}
        >
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}