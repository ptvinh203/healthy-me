import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { ROLE_CUSTOMER, ROLE_RESTAURANT } from "../constants/Role";
import CustomerLayout from "../layouts/CustomerLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routes";
import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { getTokensFromStorage } from "../utils/storageUtils";
import authService from "../services/authService";
import { ReducerCases } from "../constants/ReducerCases";

export default function AppRoutes() {
    const [{ account }, dispatch] = useStateContext()

    useEffect(() => {
        if (account) return
        const getAccountViaToken = async () => {
            try {
                const response = await authService.getAccountInfo()
                if (response.is_success) {
                    dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data: response.data })
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Check if user is logged in
        const token = getTokensFromStorage()
        if (token) {
            getAccountViaToken()
            return
        }

        // Login user role: TODO
        authService.login({ email: 'customer@gmail.com', password: '123456Aa' })
            .then(() => {
                getAccountViaToken()
            })
    }, [account, dispatch])

    return (
        <BrowserRouter>
            <ScrollTop /> {/* Scroll to top when load a new page */}
            <Routes>
                {/* All common route */}
                <Route path="/" element={<Outlet />}>
                    {renderRoute(routes.common)}
                </Route>

                {/* All customer route */}
                <Route path="/cus" element={<CustomerLayout />}>
                    <Route element={<ProtectedRoute allowedRoles={[ROLE_CUSTOMER]} />}>
                        {renderRoute(routes.customer)}
                    </Route>
                </Route>

                {/* All restaurant route */}
                <Route path="/res" element={<RestaurantLayout />}>
                    <Route element={<ProtectedRoute allowedRoles={[ROLE_RESTAURANT]} />}>
                        {renderRoute(routes.restaurant)}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const renderRoute = (routes) => {
    return routes.map((route, index) =>
        <Route key={index} path={route.path} element={route.element} />
    )
}