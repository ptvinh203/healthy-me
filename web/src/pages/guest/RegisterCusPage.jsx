import { Flex, Select, Typography, DatePicker, Button } from "antd";
import Logo from "../../components/guest/Logo";
import colors from "../../constants/Colors";
import InputFieldText from "../../components/guest/InputFieldText";
import InputFieldPassword from "../../components/guest/InputFieldPassword";
import ButtonStyled from "../../components/common/ButtonStyled";
import Iphone from "../../assets/images/iphone.png";
import Google from "../../assets/images/google.png";
import Facebook from "../../assets/images/fb.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
import authService from "../../services/authService";
import { showErrorNotification, showSuccessNotification } from "../../utils/commonUtils";
import { useState } from "react";
const { Option } = Select;

function RegisterCusPage() {
    const { Title } = Typography;

    const { control, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const passwordValue = watch('password');
    const navigate = useNavigate()

    const onSubmit = async (credentials) => {
        try {
            if (credentials.height)
                credentials.height = credentials.height / 100;

            if (credentials.weight)
                credentials.weight = credentials.weight * 1;

            if (credentials.dateOfBirth) {
                const date = new Date(credentials.dateOfBirth);
                const timestamp = date.getTime();
                credentials.dateOfBirth = timestamp;
            }
            setLoading(true);
            const res = await authService.register(credentials);
            if (res.is_success) {
                showSuccessNotification("Thành công", "Đăng ký tài khoản người dùng thành công!")
                navigate("/login")
            }
            return res.data;
        } catch (error) {
            showErrorNotification("Đăng ký thất bại", error.message)
        } finally {
            setLoading(false);
        }
    }

    const onEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <>
            <Flex style={{
                width: "100%",
                height: "100vh"
            }} vertical>
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
                                    Đăng ký để nhận chế độ dinh dưỡng của bạn
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
                                    Đăng ký người dùng
                                </Title>
                            </Flex>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }} onKeyDown={onEnterPress}>
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
                                            <InputFieldText
                                                {...field}
                                                placeholder="Nhập email"
                                                status={error ? 'error' : ""}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}</>
                                    )}
                                />


                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Hãy nhập mật khẩu"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
                                            message: "Mật khẩu phải từ 8 đến 32 ký tự, chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, và 1 ký tự số."
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <InputFieldPassword
                                                {...field}
                                                placeholder={"Nhập mật khẩu"}
                                                status={error ? "error" : ""}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />

                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Hãy nhập lại mật khẩu"
                                        },
                                        validate: (value) =>
                                            value === passwordValue || "Mật khẩu không khớp"
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <InputFieldPassword
                                                {...field}
                                                placeholder={"Nhập lại mật khẩu"}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />

                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <Controller
                                        name="date_of_birth"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Ngày sinh là bắt buộc"
                                            },
                                            validate: (value) =>
                                                value && value.isBefore(moment(), 'day') || "Ngày sinh phải trước ngày hôm nay"
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <DatePicker
                                                    {...field}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                    }}
                                                    style={{
                                                        padding: "10px",
                                                        marginBottom: "10px",
                                                        width: "100%",
                                                        height: "auto",
                                                        backgroundColor: colors.lightBackground
                                                    }}
                                                    format="YYYY-MM-DD"
                                                    placeholder="Ngày sinh"
                                                />
                                                {error && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {error.message}
                                                    </span>
                                                )}
                                            </>

                                        )}
                                    />
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Hãy chọn giới tính"
                                            }
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    onChange={(gender) => {
                                                        field.onChange(gender);
                                                    }}
                                                    placeholder="giới tính"
                                                    style={{
                                                        margin: "0px 0px 10px 10px",
                                                        height: "auto",
                                                        width: "60%",
                                                    }}
                                                >
                                                    <Option value="MALE">Nam</Option>
                                                    <Option value="FEMALE">Nữ</Option>
                                                    <Option value="OTHER">Khác</Option>
                                                </Select>
                                                {error && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {error.message}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                </Flex>
                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <div style={{ width: "45%" }}>
                                        <Controller
                                            name="height"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Hãy nhập chiều cao"
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Phải là số"
                                                },
                                                min: {
                                                    value: 0,
                                                    message: "Chiều cao phải cao hơn 100cm"
                                                },
                                                max: {
                                                    value: 250,
                                                    message: "Chiều cao phải thấp hơn 250cm"
                                                }
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <>
                                                    <InputFieldText
                                                        {...field}
                                                        placeholder={"Chiều cao"}
                                                        suffix={"cm"}
                                                    />
                                                    {error && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {error.message}
                                                        </span>
                                                    )}
                                                </>

                                            )}
                                        />
                                    </div>
                                    <div style={{ width: "45%" }}>
                                        <Controller
                                            name="weight"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Hãy nhập cân nặng"
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Phải là số"
                                                }
                                                , min: {
                                                    value: 10,
                                                    message: "Cân nặng phải lớn hơn 10kg"
                                                },
                                                max: {
                                                    value: 500,
                                                    message: "Cân nặng phải thấp hơn 500kg"
                                                }
                                            }}

                                            render={({ field, fieldState: { error } }) => (
                                                <>
                                                    <InputFieldText
                                                        {...field}
                                                        placeholder={"Cân nặng"}
                                                        suffix={"kg"}
                                                    />
                                                    {error && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {error.message}
                                                        </span>
                                                    )}
                                                </>

                                            )}
                                        />
                                    </div>
                                </Flex>
                                <Flex style={{ width: "100%", marginTop: "20px" }}>
                                    <ButtonStyled type={"submit"}
                                        cusWidth={"100%"} style={{ width: "100%" }} loading={loading}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                form.submit();
                                            }
                                        }}
                                    >
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
        </>
    );
}

export default RegisterCusPage;
