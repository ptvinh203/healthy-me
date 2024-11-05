import { Layout } from "antd";
import colors from "../constants/Colors";
import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_RESTAURANT } from "../constants/Role";

const { Content } = Layout;

function LandingPage() {
    const [{ account }] = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (account) {
            switch (account?.role) {
                case ROLE_CUSTOMER:
                    navigate('/cus/home');
                    break;
                case ROLE_RESTAURANT:
                    navigate('/res/home');
                    break;
                case ROLE_ADMIN:
                    navigate('/admin/home');
                    break;
            }
        }
    }, [account, navigate])


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

export default LandingPage;
