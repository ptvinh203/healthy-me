import { Flex } from "antd";
import { Link } from "react-router-dom";
import ButtonStyled from "../common/ButtonStyled";
import Logo from '../../components/guest/Logo'

function Header() {
    return (
        <div style={{ padding: "50px 50px 0px 50px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Logo linkto={"/"}></Logo>
                <Flex vertical>
                    <Flex justify="flex-end">
                        <Link to="/login">
                            <ButtonStyled>
                                Đăng nhập
                            </ButtonStyled>
                        </Link>

                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}

export default Header;
