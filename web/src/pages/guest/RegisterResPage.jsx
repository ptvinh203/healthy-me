import { useState } from "react";
import { Flex, Typography, Upload, Button, Input, Tag } from "antd";
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
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";

function RegisterResPage() {
    const { control, handleSubmit } = useForm();
    const { Title } = Typography;
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (credentials) => {
        try {
            setLoading(true);
            const res = await authService.registerRestaurant(credentials);
            if (res.is_success) {
                navigate("/login")
                showSuccessNotification("Thành công", "Đăng ký tài khoản nhà hàng/quán ăn thành công");
                const resId = res.data.id;
                const formData = new FormData();
                formData.append("restaurantId", resId);
                for (const file of fileList) {
                    formData.append("files", file);
                    await uploadCertificateService.uploadCertificate(formData);
                }
            }
            return res.data;
        } catch (error) {
            showErrorNotification("Đăng ký thất bại", error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleFileChange = (file) => {
        setFileList((prevList) => [...prevList, file]);
        return false; // Prevent automatic upload
    };

    const handleRemoveFile = (fileToRemove) => {
        setFileList((prevList) => prevList.filter((file) => file !== fileToRemove));
    };
    return (
        <Flex style={{ width: "100%", height: "100vh" }} vertical>
            <div style={{ padding: "50px" }}>
                <Flex justify="space-between" style={{ width: "100%" }}>
                    <Flex vertical
                        style={{ marginBottom: '10px' }}
                    >
                        <Logo linkto={"/"}></Logo>
                    </Flex>
                </Flex>
            </div>
            <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                <Flex style={{ width: "55%", height: "100%", padding: "50px" }} vertical>
                    <Flex style={{ marginLeft: "auto" }} vertical>
                        <Flex style={{ marginBottom: "40px" }}>
                            <Title level={1} style={{ width: 600, fontSize: 50, fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
                                Đăng ký để cung cấp dinh dưỡng
                            </Title>
                        </Flex>
                        <Typography.Paragraph strong >
                            <Typography.Text style={{ wordBreak: "break-word", fontSize: 25 }}>
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
                </Flex>
                <Flex style={{ width: "45%", height: "100%", alignItems: "flex-start", justifyContent: "center" }} >
                    <Flex style={{ width: "100%", justifyContent: "center", alignItems: "center" }} vertical>
                        <Flex >
                            <Title level={2} style={{ marginBottom: 24, fontSize: 40 }}>
                                Đăng ký nhà hàng/quán ăn
                            </Title>
                        </Flex>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
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
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <InputFieldText {...field} placeholder="Địa chỉ" />
                                        {error && <span style={{ color: "red", fontSize: "12px" }}>{error.message}</span>}
                                    </>
                                )}
                            />
                            <Flex>
                                <Flex style={{ width: '100%', alignItems: 'center' }}>
                                    {fileList.length === 0 ? (
                                        <Input
                                            readOnly
                                            value=""
                                            style={{
                                                height: "100%",
                                                backgroundColor: colors.lightBackground,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                height: "43px",
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '310px',
                                                overflowX: 'auto',
                                                overflowY: 'hidden',
                                                whiteSpace: 'nowrap',
                                                border: "1px solid #d9d9d9",
                                                padding: "4px 11px",
                                                zIndex: "1000",
                                                borderRadius: "5px",
                                                backgroundColor: colors.lightBackground,
                                            }}
                                        >
                                            {fileList.map((file) => (
                                                <Tag
                                                    key={file.uid}
                                                    closable
                                                    onClose={() => handleRemoveFile(file)}
                                                    style={{
                                                        height: "30px",
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        marginRight: "8px", // Space between tags
                                                    }}
                                                >
                                                    {file.name.length > 15 ? `${file.name.slice(0, 12)}...` : file.name}
                                                </Tag>
                                            ))}
                                        </div>
                                    )}

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
                                                        backgroundColor: colors.lightBackground,
                                                        marginLeft: "16px",
                                                        width: '90%',
                                                    }}
                                                >
                                                    Nhấn để tải lên
                                                </Button>
                                            </Upload>
                                        )}
                                    />
                                </Flex>
                            </Flex>

                            <Flex style={{ width: "100%", marginTop: "20px" }}>
                                <ButtonStyled type="submit" cusWidth={"100%"} style={{ width: "100%" }} loading={loading}>
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
        </Flex >
    );
}

export default RegisterResPage;
