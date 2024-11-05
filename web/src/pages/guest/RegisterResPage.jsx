import React from "react";
import { Flex, Typography, Upload, Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Logo from "../../components/guest/Logo";
import colors from "../../constants/Colors";
import InputFieldText from "../../components/guest/InputFieldText";
import InputFieldPassword from "../../components/guest/InputFieldPassword";
import ButtonStyled from "../../components/common/ButtonStyled";
import Facebook from "../../assets/images/fb.png";
import Iphone from "../../assets/images/iphone.png";
import Google from "../../assets/images/google.png";
import authService from "../../services/authService";
import uploadCertificateService from "../../services/uploadCertificateService";
import { UploadOutlined } from "@ant-design/icons";

function RegisterResPage() {
    const { control, handleSubmit } = useForm();
    const [fileList, setFileList] = React.useState([]);
    const navigate = useNavigate();

    const onSubmit = async (credentials) => {
        try {
            const res = await authService.registerRestaurant(credentials);
            const resId = res.data.id;
            console.log("User registered successfully:", res.data);
            const formData = new FormData();
            formData.append("restaurantId", resId);
            for (const file of fileList) {
                formData.append("files", file);
                const uploadResponse = await uploadCertificateService.uploadCertificate(formData);
                console.log("File uploaded successfully:", uploadResponse);
            }
            if (res.is_success) {
                navigate("/login")
            }
            return res.data;

        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleFileChange = (file) => {
        setFileList((prevList) => [...prevList, file]);
        return false; // Prevent automatic upload
    };

    return (
        <Flex style={{ padding: "50px", width: "100%", height: "100vh" }} vertical>
            <Logo />
            <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                <Flex style={{ padding: "80px 50px" }} vertical>
                    <Typography.Paragraph strong style={{ width: "100%", paddingBottom: "30px" }}>
                        <Typography.Text style={{ wordBreak: "break-word", fontSize: "xx-large" }}>
                            Đăng ký để cung cấp chất dinh dưỡng cho mọi người
                        </Typography.Text>
                    </Typography.Paragraph>
                    <Typography.Paragraph strong>
                        <Typography.Text style={{ wordBreak: "break-word" }}>
                            Nếu bạn đã có tài khoản
                            <br />
                            <span>
                                bạn có thể
                                <Link to={"/login"}>
                                    <p style={{ color: colors.secondary, display: "inline" }}> Đăng nhập tại đây! </p>
                                </Link>
                            </span>
                        </Typography.Text>
                    </Typography.Paragraph>
                </Flex>
                <Flex style={{ width: "100%", padding: "0px 100px", alignItems: "flex-end" }} vertical>
                    <Flex style={{ width: "50%" }} vertical>
                        <Flex style={{ justifyContent: "center" }}>
                            <Typography.Paragraph strong style={{ display: "flex", flexDirection: "row", paddingBottom: "10px" }}>
                                <Typography.Text style={{ fontSize: "x-large" }}>
                                    Đăng ký cho nhà hàng/quán ăn
                                </Typography.Text>
                            </Typography.Paragraph>
                        </Flex>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Hãy nhập email",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Hãy nhập đúng định dạng email"
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldText {...field} placeholder="Nhập email" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Hãy nhập mật khẩu",
                                    minLength: {
                                        value: 8,
                                        message: "Mật khẩu phải có ít nhất 8 ký tự"
                                    }, pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
                                        message: "Mật khẩu phải từ 8 đến 32 ký tự, chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, và 1 ký tự số."
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldPassword {...field} placeholder="Nhập mật khẩu" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />

                            <Controller
                                name="confirm_password"
                                control={control}
                                rules={{
                                    required: "Hãy nhập lại mật khẩu",
                                    validate: (value, { password }) => value === password || "Mật khẩu không khớp"
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldPassword {...field} placeholder="Nhập lại mật khẩu" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />

                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Hãy nhập tên"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Zàáảãạăắẳẵặâấầẩẫậêếềểễệôốồổỗộơớờởỡợúùủũụưứừửữựíìỉĩịýỳỷỹỵđ\s]+$/,
                                        message: "Tên không được chứa ký tự số hoặc ký tự đặc biệt"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Tên phải dài hơn 8 ký tự"
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: "Tên phải ngắn hơn 100 ký tự"
                                    }
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldText {...field} placeholder="Tên" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />

                            <Controller
                                name="address"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Hãy nhập địa chỉ",
                                    },
                                    minLength: {
                                        value: 9,
                                        message: "Địa chỉ phải có ít nhất 9 ký tự",
                                    },
                                    maxLength: {
                                        value: 399,
                                        message: "Địa chỉ không được vượt quá 399 ký tự",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9àáảãạăắẳẵặâấầẩẫậêếềểễệôốồổỗộơớờởỡợúùủũụưứừửữựíìỉĩịýỳỷỹỵđ\s]+$/,
                                        message: "Địa chỉ không được chứa ký tự đặc biệt",
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldText {...field} placeholder="Địa chỉ" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />
                            <Flex style={{ marginBottom: "20px" }}>
                                <Flex style={{ width: "100%", alignItems: "center", marginTop: "10px" }}>
                                    <></>
                                    <Input
                                        readOnly
                                        value={fileList.map(file => file.name).join(", ")}
                                        style={{
                                            padding: "10px",
                                            marginBottom: "10px",
                                            width: "100%",
                                            backgroundColor: colors.lightBackground,
                                            cursor: "default",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            flex: 1,
                                            maxWidth: 'calc(100% - 50px)'
                                        }}
                                    />

                                    <Controller
                                        name="certificate"
                                        control={control}
                                        render={() => (
                                            <Upload
                                                multiple
                                                beforeUpload={handleFileChange}
                                                showUploadList={false}
                                                maxCount={3}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                    style={{
                                                        padding: "10px",
                                                        marginLeft: "10px",
                                                        backgroundColor: colors.lightBackground,
                                                        height: "auto",
                                                        marginBottom: "10px",
                                                        width: "100%",
                                                    }}
                                                >
                                                    Nhấn để tải lên
                                                </Button>
                                            </Upload>
                                        )}
                                    />
                                </Flex>



                            </Flex>


                            <Flex style={{ width: "100%" }}>
                                <ButtonStyled type="submit" cusWidth={"100%"} style={{ width: "100%" }}>
                                    Đăng kí
                                </ButtonStyled>
                            </Flex>

                            <Flex style={{ justifyContent: 'space-evenly', margin: "20px 0px" }}>
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
    );
}

export default RegisterResPage;
