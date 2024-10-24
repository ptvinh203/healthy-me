import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import logo from '../assets/svgs/logo.svg';
import healthIcon from '../assets/svgs/sidebar/healthIcon.svg';
import historyIcon from '../assets/svgs/sidebar/historyIcon.svg';
import logoutIcon from '../assets/svgs/sidebar/logoutIcon.svg';
import orderIcon from '../assets/svgs/sidebar/orderIcon.svg';
import settingsIcon from '../assets/svgs/sidebar/settingsIcon.svg';
import colors from '../constants/Colors';
import { ROLE_CUSTOMER, ROLE_RESTAURANT } from '../constants/Role';

const { Sider } = Layout;

const Sidebar = () => {
    const userRole = ROLE_CUSTOMER
    const [selectedKey, setSelectedKey] = useState('1');

    const handleMenuClick = (key) => {
        setSelectedKey(key);
    };

    // Menu items for customer
    const customerMenuItems = [
        {
            key: '1',
            icon: <img src={healthIcon} alt="Health" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý sức khoẻ',
        },
        {
            key: '2',
            icon: <img src={orderIcon} alt="Order" style={{ width: '16px', height: '16px' }} />,
            label: 'Đặt hàng',
        },
        {
            key: '3',
            icon: <img src={historyIcon} alt="History" style={{ width: '16px', height: '16px' }} />,
            label: 'Lịch sử đặt hàng',
        },
        {
            key: '4',
            icon: <img src={settingsIcon} alt="Settings" style={{ width: '16px', height: '16px' }} />,
            label: 'Cài đặt',
        },
        {
            key: '5',
            icon: <img src={logoutIcon} alt="Logout" style={{ width: '16px', height: '16px' }} />,
            label: 'Thoát',
        },
    ];

    // Menu items for restaurant
    const restaurantMenuItems = [
        {
            key: '1',
            icon: <img src={orderIcon} alt="Order" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý đơn hàng',
        },
        {
            key: '2',
            icon: <img src={settingsIcon} alt="Settings" style={{ width: '16px', height: '16px' }} />,
            label: 'Cài đặt nhà hàng',
        },
        {
            key: '3',
            icon: <img src={logoutIcon} alt="Logout" style={{ width: '16px', height: '16px' }} />,
            label: 'Thoát',
        },
    ];

    const menuItems = userRole === ROLE_RESTAURANT ? restaurantMenuItems : customerMenuItems;

    const menuItemsWithStyles = menuItems.map(item => ({
        key: item.key,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <img
                    src={item.icon.props.src}
                    alt={item.icon.props.alt}
                    style={{
                        width: '16px',
                        height: '16px',
                        filter: selectedKey === item.key ? 'none' : `invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(40%) contrast(90%)`,
                        marginRight: '8px',
                    }}
                />
                <span style={{ color: selectedKey === item.key ? 'white' : colors.textPrimary }}>
                    {item.label}
                </span>
            </div>
        ),
        onClick: () => handleMenuClick(item.key),
    }));

    return (
        <Sider
            width={200}
            className="site-layout-background"
            style={{
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '30px',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            {/* Logo */}
            <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white' }}>
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: '30%',
                        borderRadius: '10px',
                    }}
                />
            </div>

            {/* Custom selected menu item */}
            <style>
                {`
                    .ant-menu-item-selected {
                        background-color: #303030 !important; /* Màu nền bạn muốn */
                        color: white !important; /* Màu chữ */
                    }

                    .ant-menu-item-selected:hover {
                        background-color: #404040 !important; /* Màu nền khi hover */
                    }
                `}
            </style>

            {/* Menu */}
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ height: 'calc(100% - 64px)', border: 'none' }}
                items={menuItemsWithStyles}
            />
        </Sider>
    );
};

export default Sidebar;

