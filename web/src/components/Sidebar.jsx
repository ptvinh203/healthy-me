import { Layout, Menu, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/svgs/logo.svg';
import healthIcon from '../assets/svgs/sidebar/healthIcon.svg';
import historyIcon from '../assets/svgs/sidebar/historyIcon.svg';
import logoutIcon from '../assets/svgs/sidebar/logoutIcon.svg';
import orderIcon from '../assets/svgs/sidebar/orderIcon.svg';
import orderManageIcon from '../assets/svgs/sidebar/OrderManageIcon.svg';
import settingsIcon from '../assets/svgs/sidebar/settingsIcon.svg';
import calendarIcon from '../assets/svgs/sidebar/calendarIcon.svg';
import chartpieIcon from '../assets/svgs/sidebar/chartpieIcon.svg';
import messageIcon from '../assets/svgs/sidebar/messageIcon.svg';
import "../assets/css/ant_menu_item.css"
import colors from '../constants/Colors';
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_RESTAURANT } from '../constants/Role';
import { clearTokensFromStorage } from '../utils/storageUtils';
import { ReducerCases } from '../constants/ReducerCases';
import { useStateContext } from '../context/StateContext';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const { Sider } = Layout;

const Sidebar = () => {
    const [modal, modalContextHolder] = Modal.useModal();
    const [{ account }, dispatch] = useStateContext();

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
            path: '/cus/order/history'
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
            icon: <img src={healthIcon} alt="Manage" style={{ width: '16px', height: '16px' }} />,
            label: 'Bảng điều khiển',
            path: '/res/home'
        },
        {
            key: '2',
            icon: <img src={orderIcon} alt="ItemManage" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lí món ăn',
            path: '/res/listfood'
        },
        {
            key: '3',
            icon: <img src={messageIcon} alt="AddMeal" style={{ width: '16px', height: '16px' }} />,
            label: 'Thêm món ăn',
            path: "/res/add-manage",
        },
        {
            key: '4',
            icon: <img src={chartpieIcon} alt="ManageOrder" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý đơn hàng',
            path: "/res/add-manage",
        },
        {
            key: '5',
            icon: <img src={settingsIcon} alt="Settings" style={{ width: '16px', height: '16px' }} />,
            label: 'Cài đặt',
            path: "/res/add-manage",
        },
        {
            key: '6',
            icon: <img src={logoutIcon} alt="Logout" style={{ width: '16px', height: '16px' }} />,
            label: 'Thoát',
            logout: true
        },
    ];

    const adminMenuItems = [
        {
            key: '1',
            icon: <img src={calendarIcon} alt="Waitting" style={{ width: '16px', height: '16px' }} />,
            label: 'Danh sách chờ',
            path: "/admin/home"
        },
        {
            key: '2',
            icon: <img src={messageIcon} alt="RestaurantManagerment" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý nhà hàng',
            path: "/admin/home"
        },
        {
            key: '3',
            icon: <img src={chartpieIcon} alt="CustomerManagerment" style={{ width: '16px', height: '16px' }} />,
            label: 'Quản lý người dùng',
            path: "/admin/home"
        },
        {
            key: '4',
            icon: <img src={logoutIcon} alt="Logout" style={{ width: '16px', height: '16px' }} />,
            label: 'Thoát',
            logout: true
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const menuMap = {
        [ROLE_RESTAURANT]: restaurantMenuItems,
        [ROLE_ADMIN]: adminMenuItems,
        [ROLE_CUSTOMER]: customerMenuItems,
    };

    const menuItems = menuMap[account?.role] ?? customerMenuItems;

    const [selectedKey, setSelectedKey] = useState(menuItems.find(item => item.path === location.pathname)?.key ?? '1');
    const handleMenuClick = (item) => {
        if (item.logout) {
            modal.confirm({
                title: 'Đăng xuất',
                icon: <ExclamationCircleOutlined />,
                centered: true,
                content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?',
                okText: 'Đăng xuất',
                cancelText: 'Hủy',
                onOk() {
                    clearTokensFromStorage();
                    dispatch({ type: ReducerCases.RESET_STATE });
                    navigate('/');
                }
            });
            return;
        }
        setSelectedKey(item.key);
        // Navigate to the selected path
        navigate(item.path);
    };

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
            {modalContextHolder}
        </Sider>
    );
};

export default Sidebar;

