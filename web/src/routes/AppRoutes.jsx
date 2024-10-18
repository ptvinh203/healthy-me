import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ROLE_CUSTOMER, ROLE_RESTAURANT } from "../constants/Role";
import ProtectedRoute from "./ProtectedRoute";
import ScrollTop from "../components/ScrollTop";
import { routes } from "./routes";
import CustomerLayout from "../layouts/CustomerLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";

export default function AppRoutes() {
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