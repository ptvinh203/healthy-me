import { Flex, Select, Typography, DatePicker, Button } from "antd";
import Logo from "../../components/guest/Logo";
import colors from "../../constants/Colors";
import InputFieldText from "../../components/guest/InputFieldText";
import InputFieldPassword from "../../components/guest/InputFieldPassword";
import ButtonStyled from "../../components/common/ButtonStyled";
import Iphone from "../../assets/images/iphone.png";
import Google from "../../assets/images/google.png";
import Facebook from "../../assets/images/fb.png";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
const { Option } = Select;

function RegisterCusPage() {
    const { control, handleSubmit, setValue, watch } = useForm();
    const passwordValue = watch('password');

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <Flex style={{
                padding: "50px",
                width: "100%",
                height: "100vh"
            }} vertical>
                <Logo />
                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                    <Flex style={{ padding: "80px 50px" }} vertical>
                        <Typography.Paragraph strong style={{ width: "100%", paddingBottom: "30px" }}>
                            <Typography.Text style={{ wordBreak: "break-word", fontSize: "xx-large" }}>
                                Đăng ký để nhận chất dinh dưỡng của bạn
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
                                        Đăng ký người dùng
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
                                    name="confirmPassword"
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
                                                        field.onChange(date); // Cập nhật giá trị cho react-hook-form
                                                    }}
                                                    style={{
                                                        padding: "10px",
                                                        marginBottom: "10px",
                                                        width: "100%",
                                                        height: "auto", backgroundColor: colors.lightBackground

                                                    }}
                                                    format="YYYY-MM-DD"
                                                />
                                                {error && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {error.message}
                                                    </span>
                                                )}
                                            </>

                                        )}
                                    />

                                    <Select
                                        onChange={(data, gender) => {
                                            setValue("gender", gender.value)
                                        }}
                                        placeholder="giới tính"
                                        style={{
                                            margin: "0px 0px 10px 10px",
                                            height: "auto",
                                            width: "60%",
                                            backgroundColor: colors.lightBackground
                                        }}
                                    >
                                        <Option value="Nam">Nam</Option>
                                        <Option value="Nữ">Nữ</Option>
                                        <Option value="Khác">Khác</Option>
                                    </Select>

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
                                                    value: 100,
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
                                <Flex style={{ width: "100%" }}>
                                    <ButtonStyled type={"submit"} cusWidth={"100%"} style={{ width: "100%" }}>
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
        </>
    );
}

export default RegisterCusPage;
