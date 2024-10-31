import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from '../context/StateContext';
import { useEffect, useState } from 'react';
import authService from '../services/authService';
import { ReducerCases } from '../constants/ReducerCases';
import { getTokensFromStorage } from '../utils/storageUtils';
import Loading from '../components/Loading';

export default function ProtectedRoute(props) {
    const location = useLocation()
    const [{ account }, dispatch] = useStateContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (account) {
            setLoading(false)
            return
        }

        const getAccountViaToken = async () => {
            try {
                const response = await authService.getAccountInfo()
                if (response.is_success) {
                    dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data: response.data })
                    setLoading(false)
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

        setLoading(false)
    }, [account, dispatch])

    // Show loading spinner while checking if user is logged in
    if (loading)
        return <Loading />

    // Show the protected route if user is logged in and has the required role
    return props.allowedRoles.includes(account?.role)
        ? <Outlet />
        : account
            ? <Navigate to="/unauthorized" replace state={{ from: location }} />
            : <Navigate to="/login" replace state={{ from: location }} />
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array.isRequired
}