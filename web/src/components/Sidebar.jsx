import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/svgs/logo.svg';
import healthIcon from '../assets/svgs/sidebar/healthIcon.svg';
import historyIcon from '../assets/svgs/sidebar/historyIcon.svg';
import logoutIcon from '../assets/svgs/sidebar/logoutIcon.svg';
import orderIcon from '../assets/svgs/sidebar/orderIcon.svg';
import settingsIcon from '../assets/svgs/sidebar/settingsIcon.svg';
import colors from '../constants/Colors';
import { ROLE_CUSTOMER, ROLE_RESTAURANT } from '../constants/Role';
import { clearTokensFromStorage } from '../utils/storageUtils';
import { useStateContext } from '../context/StateContext';
import { ReducerCases } from '../constants/ReducerCases';

const { Sider } = Layout;

const Sidebar = () => {
    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useStateContext();

    // Menu items for customer
    const customerMenuItems = [
        {
            key: '1',
            icon: <img src={healthIcon} alt="Health" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý sức khoẻ',
            path: '/cus/home'
        },
        {
            key: '2',
            icon: <img src={orderIcon} alt="Order" style={{ width: '16px', height: '16px' }} />,
            label: 'Đặt hàng',
            path: '/cus/order'
        },
        {
            key: '3',
            icon: <img src={historyIcon} alt="History" style={{ width: '16px', height: '16px' }} />,
            label: 'Lịch sử đặt hàng',
            path: '/cus' // TODO: update path
        },
        {
            key: '4',
            icon: <img src={settingsIcon} alt="Settings" style={{ width: '16px', height: '16px' }} />,
            label: 'Cài đặt',
            path: '/cus/info'
        },
        {
            key: '5',
            icon: <img src={logoutIcon} alt="Logout" style={{ width: '16px', height: '16px' }} />,
            label: 'Thoát',
            logout: true
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
            logout: true
        },
    ];

    const userRole = ROLE_CUSTOMER
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(customerMenuItems.find(item => item.path === location.pathname)?.key ?? '1');

    const handleMenuClick = (item) => {
        if (item.logout) {
            clearTokensFromStorage();
            dispatch({ type: ReducerCases.RESET_STATE });
            navigate('/');
            return;
        }
        setSelectedKey(item.key);
        // Navigate to the selected path
        navigate(item.path);
    };

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
        onClick: () => handleMenuClick(item),
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
            <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', cursor: 'pointer' }}>
                <Link to='/'>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: '30%',
                            borderRadius: '10px',
                        }}
                    />
                </Link>
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

