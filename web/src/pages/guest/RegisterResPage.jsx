import { Flex, Typography, Input, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import Logo from "../../components/guest/Logo";
import colors from "../../constants/Colors"
import InputFieldText from "../../components/guest/InputFieldText";
import InputFieldPassword from "../../components/guest/InputFieldPassword";
import "../../constants/Colors"
import "../../assets/css/ant_select.css"
import ButtonStyled from "../../components/common/ButtonStyled";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Facebook from "../../assets/images/fb.png"
import Iphone from "../../assets/images/iphone.png"
import Google from "../../assets/images/google.png"
function RegisterResPage() {
    const { register } = useForm();

    const { Text, Paragraph } = Typography;
    const handleFileUpload = ({ file }) => {
        axios.post("http://localhost:8000/uploadCertificate", file, {
            onUploadProgress: (e) => {
                console.log(e)
            }
        })
    }

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
                                Đăng ký để cung cấp chất dinh dưỡng cho mọi người
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
                                        Đăng ký cho nhà hàng/quán ăn
                                    </Text>
                                </Paragraph>
                            </Flex>
                            <form style={{ width: "100%" }}>

                                <InputFieldText  {...register("email")} placeholder={"Nhập email"}  ></InputFieldText>
                                <InputFieldPassword {...register("password")} placeholder={"Nhập mật khẩu"}  ></InputFieldPassword>
                                <InputFieldPassword placeholder={"Nhập lại mật khẩu"}  ></InputFieldPassword>
                                <InputFieldText {...register("name")} placeholder={"Tên"}  ></InputFieldText>
                                <InputFieldText {...register("name")} placeholder={"Địa chỉ"}  ></InputFieldText>
                                <Flex style={{ marginBottom: "20px" }}>
                                    <Input type="files" style={{
                                        padding: "10px",
                                        marginBottom: "10px",
                                        width: "100%",
                                        backgroundColor: colors.lightBackground,
                                    }} placeholder={"Giấy chứng nhận"}  ></Input>
                                    <Upload
                                        customRequest={handleFileUpload}
                                        multiple
                                    >
                                        <Button style={{
                                            marginLeft: "5px", padding: "10px",
                                            marginBottom: "10px",
                                            width: "100%",
                                            height: "auto",
                                            backgroundColor: colors.lightBackground,
                                        }}>
                                            Nhấn để tải lên
                                        </Button>
                                    </Upload>
                                </Flex>


                                <Flex style={{ width: "100%" }}>
                                    <ButtonStyled cusWidth={"100%"} style={{ width: "100%" }}>
                                        Đăng kí
                                    </ButtonStyled>
                                </Flex>
                                <Flex style={{ justifyContent: 'space-evenly', margin: "20px 0px" }} >
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={Google} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={Iphone} alt="Apple Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={Facebook} alt="Facebook Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                </Flex>
                            </form>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </>
    );
}

export default RegisterResPage;