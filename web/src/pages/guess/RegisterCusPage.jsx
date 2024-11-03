import { Flex, Select, Typography, DatePicker } from "antd";
import Logo from "../../components/guest/Logo";
import colors from "../../constants/Colors"
import InputFieldText from "../../components/guest/InputFieldText";
import InputFieldPassword from "../../components/guest/InputFieldPassword";
import "../../constants/Colors"
import "../../assets/css/ant_select.css"
import ButtonStyled from "../../components/common/ButtonStyled";
import Facebook from "../../assets/images/Facebook.png"
import { Link } from "react-router-dom";
function RegisterCusPage() {

    const { Text, Paragraph } = Typography;
    const genderList = [
        {
            label: 'Nam',
            value: 'Nam',
        },
        {
            label: 'Nữ',
            value: 'Nữ',
        },
        {
            label: 'Khác',
            value: 'Khác',
        }
    ]
    const labelRender = (props) => {
        const { label, value } = props;
        if (label) {
            return value;
        }
        return <span>No option match</span>;
    };

    return (
        <>
            <Flex style={{
                padding: "50px",
                width: "100%",
                height: "100vh"
            }} vertical>
                <Logo></Logo>
                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                    <Flex style={{ padding: "80px 50px" }} vertical>
                        <Paragraph strong style={{ width: "100%", paddingBottom: "30px" }}>
                            <Text style={{ wordBreak: "break-word", fontSize: "xx-large" }}>
                                Đăng ký để nhận chất dinh dưỡng của bạn
                            </Text>
                        </Paragraph>
                        <Paragraph strong >
                            <Text style={{ wordBreak: "break-word" }}>
                                Nếu bạn đã có tài khoản
                                <br />
                                <span>
                                    bạn có thể
                                    <Link to={"/login"}>
                                        <p style={{ color: colors.secondary, display: "inline" }}> Đăng nhập tại đây! </p>
                                    </Link>
                                </span>
                            </Text>
                        </Paragraph>
                    </Flex>
                    <Flex style={{ width: "100%", padding: "0px 100px", alignItems: "flex-end" }} vertical>
                        <Flex style={{ width: "50%" }} vertical>
                            <Flex style={{ justifyContent: "center" }}>
                                <Paragraph strong style={{ display: "flex", flexDirection: "row", paddingBottom: "10px" }} >
                                    <Text style={{ fontSize: "x-large" }}>
                                        Đăng ký người dùng
                                    </Text>
                                </Paragraph>
                            </Flex>
                            <div style={{ width: "100%" }}>
                                <InputFieldText placeholder={"Nhập email"}  ></InputFieldText>
                                <InputFieldPassword placeholder={"Nhập mật khẩu"}  ></InputFieldPassword>
                                <InputFieldPassword placeholder={"Nhập lại mật khẩu"}  ></InputFieldPassword>
                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <DatePicker
                                        style={{
                                            padding: "10px",
                                            marginBottom: "10px",
                                            width: "100%",
                                            height: "auto",
                                            backgroundColor: colors.lightBackground
                                        }}
                                        format={{
                                            format: 'YYYY-MM-DD HH:mm:ss',
                                            type: 'mask',
                                        }}
                                    />
                                    <Select
                                        labelRender={labelRender}
                                        defaultValue={genderList[0]}
                                        style={{
                                            margin: "0px 0px 10px 10px",
                                            height: "auto",
                                            width: "60%",
                                            backgroundColor: colors.lightBackground
                                        }}
                                        options={genderList}
                                    />
                                </Flex>

                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <div style={{ width: "45%" }}>
                                        <InputFieldText placeholder={"Chiều cao"} suffix={"cm"}  ></InputFieldText>
                                    </div>
                                    <div style={{ width: "45%" }}>
                                        <InputFieldText placeholder={"Cân nặng"} suffix={"kg"} ></InputFieldText>
                                    </div>
                                </Flex>
                                <Flex style={{ width: "100%" }}>
                                    <ButtonStyled cusWidth={"100%"} style={{ width: "100%" }}>
                                        Đăng kí
                                    </ButtonStyled>
                                </Flex>
                                <Flex style={{ justifyContent: 'space-evenly', margin: "20px 0px" }} >
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", background: colors.grayLight, border: `${colors.borderlight} solid 0.3px`, borderRadius: "5px" }}>
                                        <img src={Facebook} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", background: colors.grayLight, border: `${colors.borderlight} solid 0.3px`, borderRadius: "5px" }}>
                                        <img src={Facebook} alt="Apple Icon" style={{ width: '24px', height: '24px' }} />
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", background: colors.grayLight, border: `${colors.borderlight} solid 0.3px`, borderRadius: "5px" }}>
                                        <img src={Facebook} alt="Facebook Icon" style={{ width: '24px', height: '24px' }} />
                                    </Flex>
                                </Flex>
                            </div>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </>
    );
}

export default RegisterCusPage;