import { Flex } from "antd";
import LogoText from "../../assets/images/logo_text.png";
import LogoPic from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Logo({ linkto }) {
    const [linkTo, setLinkTo] = useState(linkto);
    return (
        <Flex vertical>
            <Link style={{ display: "flex", flexDirection: "row", cursor: "pointer" }} to={linkTo} >
                <img src={LogoPic} alt="Logo" style={{ width: "40.6125px", height: "37.5px" }} />
                <Flex vertical style={{ justifyContent: "flex-start" }}>
                    <img
                        src={LogoText}
                        style={{ width: "120px", height: "30px", marginLeft: "20px" }}
                        alt="Logo Text"
                    />
                </Flex>
            </Link>
        </Flex>
    );
}

export default Logo;