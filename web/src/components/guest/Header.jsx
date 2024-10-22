import { Flex } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoText from "../../assets/images/logo_text.png";
function Header() {
    function scrollToTop() {
        window.scrollTo(0, 0)
    }
    return (
        <div style={{ padding: "50px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Flex vertical>
                    <Flex style={{ paddingBottom: "50px", cursor: "pointer" }}>
                        <div onClick={() => scrollToTop()}>
                            <img className="logo" src={Logo} alt="Logo" />
                            <img className="logo_text" src={LogoText} alt="Logo Text" />

                        </div>

                    </Flex>
                </Flex>
                <Flex vertical>
                    <Flex justify="flex-end">
                        <Button
                            style={{
                                width: "fit-content",
                                padding: "15px",
                                backgroundImage: "linear-gradient(to right, #3A8EF6, #6F3AFA)",
                            }}
                        >
                            <Link to={"/login"} style={{ color: "#FFFFFF" }}>
                                Đăng nhập
                            </Link>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}

export default Header;
