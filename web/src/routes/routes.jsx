import CustomerHome from "../pages/customer/CustomerHome";
import CustomerOrder from "../pages/customer/CustomerOrder";
import CustomerDetail from "../pages/customer/CustomerOrderDetail";
import CustomerShoppingCart from "../pages/customer/CustomerShoppingCart";
import CustomerPayment from "../pages/customer/CustomerPayment";
import OrderSuccess from "../pages/customer/OrderSuccess";
import PageNotFound from "../pages/error/PageNotFound";
import Unauthorized from "../pages/error/Unauthorized";
import Login from "../pages/Login";
import LandingPage from "../pages/guest/LandingPage";
import RegisterPage from "../pages/guest/RegisterPage";
import CustomerInfo from "../pages/customer/CustomerInfo";
import ListFood from "../pages/restaurant/ListFood"

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
            element: <Login />
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
    ],
    restaurant: [
        {
            path: "/res/home",
            element: null
        },
        {
            path: "/res/listfood",
            element: <ListFood />
        },
    ],
    admin: []
}