import { Layout } from "antd";
import colors from "../constants/Colors";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function GuestLayout() {
    return (
        <Layout
            style={{
                background: `linear-gradient(45deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
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

export default GuestLayout;
