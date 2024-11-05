import { Flex } from "antd";
import { Link } from "react-router-dom";
import ButtonStyled from "../common/ButtonStyled";
import Logo from '../../components/guest/Logo'

function Header() {
    return (
        <div style={{ padding: "50px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Logo ></Logo>
                <Flex vertical>
                    <Flex justify="flex-end">
                        <ButtonStyled>
                            <Link to="/login">
                                Đăng nhập
                            </Link>
                        </ButtonStyled>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}

export default Header;
