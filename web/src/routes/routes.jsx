/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

//---------------------------
// imports
//---------------------------
const Login = lazy(() => import("../pages/Login"));
const Unauthorized = lazy(() => import("../pages/error/Unauthorized"));
const PageNotFound = lazy(() => import("../pages/error/PageNotFound"));
const CustomerHome = lazy(() => import("../pages/customer/CustomerHome"));
const CustomerDetail = lazy(() => import("../pages/customer/CustomerOrderDetail"));

//---------------------------
// exports
//---------------------------
export const routes = {
    common: [
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
            path : "/cus/orderdetail",
            element : <CustomerDetail />
        }
    ],
    restaurant: [],
    admin: []
}