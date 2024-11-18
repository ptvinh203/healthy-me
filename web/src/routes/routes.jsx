import CustomerHome from "../pages/customer/CustomerHome";
import CustomerInfo from "../pages/customer/CustomerInfo";
import CustomerOrder from "../pages/customer/CustomerOrder";
import CustomerDetail from "../pages/customer/CustomerOrderDetail";
import CustomerOrderHistory from "../pages/customer/CustomerOrderHistory";
import CustomerPayment from "../pages/customer/CustomerPayment";
import CustomerShoppingCart from "../pages/customer/CustomerShoppingCart";
import OrderSuccess from "../pages/customer/OrderSuccess";
import PageNotFound from "../pages/error/PageNotFound";
import Unauthorized from "../pages/error/Unauthorized";
import LandingPage from "../pages/guest/LandingPage";
import RegisterPage from "../pages/guest/RegisterPage";
import AdminHome from '../pages/admin/AdminHome';
import AdminResManage from '../pages/admin/AdminResManage';
import AdminCusManage from '../pages/admin/AdminCusManage';

import { element } from "prop-types";
import ResHome from "../pages/restaurant/ResHome";
import ResMealManage from "../pages/restaurant/ResMealManage";
import ResAddMeal from "../pages/restaurant/ResAddMeal";
import ResOrder from "../pages/restaurant/ResOrder";
import ResInfo from "../pages/restaurant/ResInfo";
import LoginPage from "../pages/Login";

export const routes = {
    common: [
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/register/:type",
            element: <RegisterPage />,
        },
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path: "/unauthorized",
            element: <Unauthorized />
        },
        {
            path: "*",
            element: <PageNotFound />
        }
    ],
    customer: [
        {
            path: "/cus/home",
            element: <CustomerHome />
        },
        {
            path: "/cus/item/:itemId",
            element: <CustomerDetail />
        },
        {
            path: "/cus/order",
            element: <CustomerOrder />
        },
        {
            path: "/cus/cart",
            element: <CustomerShoppingCart />
        },
        {
            path: "/cus/payment",
            element: <CustomerPayment />
        },
        {
            path: "/cus/order-success",
            element: <OrderSuccess />
        },
        {
            path: "/cus/info",
            element: <CustomerInfo />
        },
        {
            path: "/cus/order/history",
            element: <CustomerOrderHistory />
        }
    ],
    restaurant: [
        {
            path: "/res/home",
            element: <ResHome />
        },
        {
            path: "/res/meal-manage",
            element: <ResMealManage />
        },
        {
            path: "/res/add-manage",
            element: <ResAddMeal />
        },
        {
            path: "/res/order-manage",
            element: <ResOrder />
        },
        {
            path: "/res/info",
            element: <ResInfo />
        }
    ],
    admin: [
        {
            path: "/admin/home",
            element: <AdminHome />
        },
        {
            path: "/admin/res-manage",
            element: <AdminResManage />
        },
        {
            path: "/admin/cus-manage",
            element: <AdminCusManage />
        }
    ]
}