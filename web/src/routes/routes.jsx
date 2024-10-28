import CustomerHome from "../pages/customer/CustomerHome";
import CustomerOrder from "../pages/customer/CustomerOrder";
import CustomerDetail from "../pages/customer/CustomerOrderDetail";
import PageNotFound from "../pages/error/PageNotFound";
import Unauthorized from "../pages/error/Unauthorized";
import Login from "../pages/Login";
import LandingPage from "../pages/guess/LandingPage";
import CustomerShoppingCart from "../pages/customer/CustomerShoppingCart";
import CustomerPayment from "../pages/customer/CustomerPayment";

export const routes = {
    common: [
        {
            path: "/",
            element: <LandingPage />,
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
        }
    ],
    restaurant: [],
    admin: []
}