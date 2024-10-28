import { Flex } from "antd";
import { Button } from "antd";
import Logo from "../../assets/images/logo.png";
import LogoText from "../../assets/images/logo_text.png";
import authService from "../../services/authService";
import { useStateContext } from "../../context/StateContext";
import { ReducerCases } from "../../constants/ReducerCases";
import { useNavigate } from "react-router-dom";
function Header() {
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useStateContext();
    const navigate = useNavigate();

    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    const getAccountViaToken = async () => {
        const response = await authService.getAccountInfo()
        if (response.is_success) {
            dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data: response.data })
        }
    }

    const handleLogin = async () => {
        try {
            await authService.login({ email: 'customer@gmail.com', password: '123456Aa' })
            await getAccountViaToken()
            navigate('/cus/home')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ padding: "50px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Flex vertical>
                    <Flex
                        style={{ marginBottom: '50px', cursor: "pointer" }}
                        align="center"
                        gap={12}
                        onClick={() => scrollToTop()}
                    >
                        <img className="logo" src={Logo} alt="Logo" style={{ height: "100px" }} />
                        <img className="logo_text" src={LogoText} style={{ height: "80px" }} alt="Logo Text" />
                    </Flex>
                </Flex>
                <Flex vertical>
                    <Flex justify="flex-end">
                        <Button
                            style={{
                                color: "#FFFFFF",
                                width: "fit-content",
                                padding: "20px 30px",
                                backgroundImage: "linear-gradient(to right, #3A8EF6, #6F3AFA)",
                            }}
                            onClick={handleLogin}
                            size="large"
                        >
                            {/* <Link to={"/login"} style={{ color: "#FFFFFF" }}> */}
                            Đăng nhập
                            {/* </Link> */}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}

export default Header;
