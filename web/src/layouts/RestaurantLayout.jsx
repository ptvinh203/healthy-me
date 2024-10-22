import { Button, Layout } from 'antd';
import { Outlet } from "react-router-dom";
import bellIcon from '../assets/svgs/res/bellIcon.svg';
import Sidebar from '../components/Sidebar';
import colors from '../constants/Colors';

const { Content } = Layout;

const RestaurantLayout = () => {
    return (
        <Layout style={{
            background: `linear-gradient(45deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
            padding: '50px',
            margin: '0px',
            width: '100%',
            height: '100vh',
        }}>
            <Layout
                style={{ boxShadow: `0 4px 8px ${colors.shadow}`, borderRadius: 30 }}>
                <Sidebar />

                <Layout style={{
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    background: colors.background,
                    padding: '20px',
                    position: 'relative'
                }}>
                    <Content>
                        <Outlet />
                    </Content>

                    {/* Button float */}
                    <Button
                        type='primary'
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            zIndex: 20,
                            background: 'white',
                            width: '50px',
                            height: '50px',
                            boxShadow: `0 2px 4px ${colors.shadow}`,
                        }}
                        onClick={() => { }}
                    >
                        <img
                            src={bellIcon}
                            alt='Notification'
                            style={{ width: '24px', height: '24px' }}
                        />
                    </Button>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default RestaurantLayout;
