/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout, Input, Button, Typography, Space, Row, Col, Flex } from 'antd';
import { CloseOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Logo from "../assets/images/logo.png";
import LogoText from "../assets/images/logo_text.png";
import google_icon from "../assets/images/google.png";
import fb_icon from "../assets/images/fb.png";
import iphone_icon from "../assets/images/iphone.png";
import authService from '../services/authService';
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_RESTAURANT } from '../constants/Role';
import { useStateContext } from '../context/StateContext';
import { ReducerCases } from '../constants/ReducerCases';
import { showErrorNotification } from '../utils/commonUtils';

const { Title, Text } = Typography;

function scrollToTop() {
    window.scrollTo(0, 0)
}

function LoginPage() {
    const [_, dispatch] = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const credentials = {
        email: email,
        password: password
    };

    const clearInput = () => {
        setEmail('');
    };

    const Login = async () => {
        setLoading(true);
        try {
            const { is_success } = await authService.login(credentials);
            if (is_success) {
                const { data } = await authService.getAccountInfo();
                dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data });
                switch (data?.role) {
                    case ROLE_CUSTOMER:
                        navigate('/cus/home');
                        break;
                    case ROLE_RESTAURANT:
                        navigate('/res/home');
                        break;
                    case ROLE_ADMIN:
                        navigate('/admin/home');
                        break;
                }
            }
        } catch (error) {
            showErrorNotification("Đăng nhập thất bại", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#E3EEFF' }}>
            <div style={{ padding: 50 }}>
                <Flex justify="space-between" style={{ width: "100%" }}>
                    <Flex vertical>
                        <Flex
                            style={{ marginBottom: '10px', cursor: "pointer" }}
                            align="center"
                            gap={12}
                            onClick={() => scrollToTop()}
                        >
                            <img className="logo" src={Logo} alt="Logo" style={{ height: "100px" }} />
                            <img className="logo_text" src={LogoText} style={{ height: "80px" }} alt="Logo Text" />
                        </Flex>
                    </Flex>
                </Flex>
            </div>
            <div style={{ width: '100%' }}>
                <Row gutter={48} style={{ display: 'flex' }}>
                    <Col span={13} style={{ padding: '50px' }}>
                        <div className='register' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '200px' }}>
                            <Title level={1} style={{ width: 600, fontSize: 50, fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
                                Đăng nhập để nhận chế độ dinh dưỡng của bạn
                            </Title>
                            <Text style={{ width: 500, fontSize: '20px', color: '#666' }}>
                                Nếu bạn chưa có tài khoản, bạn có thể Đăng ký tại đây với tư cách là người dùng hoặc là nhà hàng/quán ăn!
                            </Text>
                            <div style={{ marginTop: '40px' }}>
                                <Link to="/register/customer">
                                    <Button type="primary" shape="round" size="large" style={{ marginRight: '50px' }}>
                                        Người dùng
                                    </Button>
                                </Link>
                                <Button type="primary" shape="round" size="large" style={{ marginRight: '16px' }}>
                                    <Link to="/register/restaurant">
                                        Nhà hàng/Quán ăn
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <Col span={11}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Title level={2} style={{ marginBottom: 24, fontSize: 40 }}>
                                Chào mừng bạn đã trở lại
                            </Title>

                            <Input
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ marginBottom: 10, width: 350, height: 45, borderRadius: 8, backgroundColor: '#EAF0F7' }}
                                suffix={<Button type="text" shape="circle" icon={<CloseOutlined style={{ color: '#667085' }} onClick={clearInput} />} />}
                            />

                            <Input.Password
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    marginBottom: 8,
                                    width: 350,
                                    height: 45,
                                    borderRadius: 8,
                                    backgroundColor: '#EAF0F7',
                                    paddingRight: '20px'
                                }}
                                iconRender={visible => (
                                    <span style={{ marginLeft: '-5px', color: '#667085' }}>
                                        {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                    </span>
                                )}
                            />

                            <div style={{ textAlign: 'right', marginBottom: 24, marginLeft: 210 }}>
                                <Link href="#" style={{ color: '#888' }}>
                                    Khôi phục mật khẩu?
                                </Link>
                            </div>

                            {error && (
                                <div style={{
                                    marginBottom: 16,
                                    maxWidth: 350,
                                    color: 'red',
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>
                                    {error}
                                </div>
                            )}

                            <Button type="primary" block style={{ marginBottom: 50, width: 350, height: 45, backgroundColor: '#4461F2', fontSize: 16, fontWeight: 'bold', borderRadius: 8 }}
                                onClick={Login}
                                loading={loading}>
                                Đăng nhập
                            </Button>

                            <Space size="large" style={{ display: 'flex', justifyContent: 'space-between', width: 350 }}>
                                <Button size="large" style={{ padding: '0 30px', height: 50 }}>
                                    <img src={google_icon} alt="Google Icon" style={{ width: 30, height: 30 }} />
                                </Button>
                                <Button size="large" style={{ padding: '0 30px', height: 50 }}>
                                    <img src={iphone_icon} alt="iphone Icon" style={{ width: 30, height: 30 }} />
                                </Button>
                                <Button size="large" style={{ padding: '0 30px', height: 50 }}>
                                    <img src={fb_icon} alt="fb Icon" style={{ width: 30, height: 30 }} />
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default LoginPage;