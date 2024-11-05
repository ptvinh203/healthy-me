import { Flex } from "antd";
import LogoText from "../../assets/images/logo_text.png";
import LogoPic from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Logo() {

    return (
        <Flex vertical>
            <Flex style={{ cursor: "pointer" }}>
                <Link to="/" >
                    <img src={LogoPic} alt="Logo" style={{ width: "120px", height: "80px" }} />
                    <img
                        src={LogoText}
                        style={{ width: "180px", height: "80px" }}
                        alt="Logo Text"
                    />
                </Link>
            </Flex>
        </Flex>
    );
}

export default Logo;