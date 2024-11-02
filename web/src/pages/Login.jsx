import { useState } from 'react';
import { Layout, Input, Button, Typography, Space, Row, Col, Flex } from 'antd';
import { CloseOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Logo from "../assets/images/logo.png";
import LogoText from "../assets/images/logo_text.png";
import google_icon from "../assets/images/google.png";
import fb_icon from "../assets/images/fb.png";
import iphone_icon from "../assets/images/iphone.png";
const { Title, Text, Link } = Typography;

function scrollToTop() {
    window.scrollTo(0, 0)
}

function LoginPage() {
    const [email, setEmail] = useState('');

    const clearInput = () => {
        setEmail('');
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#E3EEFF' }}>
        <div style={{ padding: "50px 50px 0px 50px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Flex vertical>
                    <Flex
                        style={{ marginBottom: '10px', cursor: "pointer" }}
                        align="center"
                        gap={12}
                        onClick={() => scrollToTop()}
                    >
                        <img className="logo" src={Logo} alt="Logo" style={{ height: "50px" }} />
                        <img className="logo_text" src={LogoText} style={{ height: "60px" }} alt="Logo Text" />
                    </Flex>
                </Flex>
            </Flex>
        </div>
            <div style={{ width: '100%' }}>
                <Row gutter={48} style={{ display: 'flex', alignItems: 'center' }}>
                    <Col span={13} style={{ padding: '50px' }}>
                        <div className='register' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '200px' }}>
                            <Title level={1} style={{ width: 450, fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
                                Đăng nhập để nhận chế độ dinh dưỡng của bạn
                            </Title>
                            <Text style={{ width:  390, fontSize: '16px', color: '#666' }}>
                                Nếu bạn chưa có tài khoản, bạn có thể Đăng ký tại đây với tư cách là người dùng hoặc là nhà hàng/quán ăn!
                            </Text>
                            <div style={{ marginTop: '40px' }}>
                                <Button type="primary" shape="round" size="large" style={{ marginRight: '16px' }}>
                                    Người dùng
                                </Button>
                                <Button type="primary" shape="round" size="large" style={{ marginRight: '16px' }}>
                                    Nhà hàng/Quán ăn
                                </Button>
                            </div>
                        </div>
                    </Col>
                    
                    <Col span={11}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Title level={2} style={{ marginBottom: 24 }}>
                                Chào mừng bạn đã trở lại
                            </Title>

                            <Input 
                                placeholder="Nhập email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ marginBottom: 10, width: 300, height: 45, borderRadius: 8, backgroundColor: '#EAF0F7'}}
                                suffix={<Button type="text" shape="circle" icon={<CloseOutlined style={{ color: '#667085' }}  onClick={clearInput}/>} />}
                            />

                            <Input.Password
                                placeholder="Mật khẩu"
                                style={{ 
                                    marginBottom: 8, 
                                    width: 300, 
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

                            <div style={{ textAlign: 'right', marginBottom: 24 , marginLeft: 170}}>
                                <Link href="#" style={{ color: '#888' }}>
                                    Khôi phục mật khẩu?
                                </Link>
                            </div>

                            <Button type="primary" block style={{ marginBottom: 24, width: 300, height: 45, backgroundColor: '#4461F2' , fontSize: 16, fontWeight: 'bold', borderRadius: 8 }}>
                                Đăng nhập
                            </Button>

                            <Space size="large" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button size="large" style={{padding: '0 29px'}}>
                                <img src={google_icon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                            </Button>
                            <Button size="large" style={{padding: '0 29px'}}>
                                <img src={iphone_icon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                            </Button>
                            <Button size="large" style={{padding: '0 29px'}}>
                                <img src={fb_icon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
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
