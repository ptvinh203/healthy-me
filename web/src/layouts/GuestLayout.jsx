import { Button, Layout } from "antd";
// import bellIcon from "../assets/svgs/res/bellIcon.svg";
import colors from "../constants/Colors";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function LandingPage() {
    return (
        <Layout
            style={{
                background: `linear-gradient(45deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                margin: "0px",
                width: "100%",
                height: "100%",
            }}
        >
            <Content >
                <Outlet />
            </Content>

            {/* <Button
                type="primary"
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 20,
                    background: "white",
                    width: "50px",
                    height: "50px",
                    boxShadow: `0 2px 4px ${colors.shadow}`,
                }}
                onClick={() => { }}
            >
                <img
                    src={bellIcon}
                    alt="Notification"
                    style={{ width: "24px", height: "24px" }}
                />
            </Button> */}
        </Layout>
    );
}

export default LandingPage;
