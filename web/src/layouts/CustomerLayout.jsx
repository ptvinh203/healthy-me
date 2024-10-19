import { Layout } from 'antd';
import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import colors from '../constants/Colors';

const { Content } = Layout;

const CustomerLayout = () => {
    return (
        <Layout style={{
            background: `linear-gradient(45deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
            padding: '50px',
            margin: '0px',
            width: '100%',
            height: '100vh',
        }}>
            <Layout style={{ boxShadow: `0 4px 8px ${colors.shadow}`, borderRadius: 30 }}>
                <Sidebar />

                <Layout style={{
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    background: colors.background,
                    padding: '20px',
                }}>
                    <Content>
                        <Outlet /> 
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default CustomerLayout;