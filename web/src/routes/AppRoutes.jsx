import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_RESTAURANT } from "../constants/Role";
import CustomerLayout from "../layouts/CustomerLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";
import GuestLayout from "../layouts/GuestLayout";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routes";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollTop /> {/* Scroll to top when load a new page */}
            <Routes>
                {/* All common route */}
                <Route path="/" element={<GuestLayout />}>
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

                {/* All admin route */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]} />}>
                        {renderRoute(routes.admin)}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const renderRoute = (routes) => {
    return routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
    ));
};
