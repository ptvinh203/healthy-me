import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../context/StateContext";

export default function ProtectedRoute(props) {
    const location = useLocation()
    const [{ account }] = useStateContext();

    return props.allowedRoles.includes(account?.role)
        ? <Outlet />
        : account
            ? <Navigate to="/unauthorized" replace state={{ from: location }} />
            : <Navigate to="/login" replace state={{ from: location }} />
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array.isRequired
}