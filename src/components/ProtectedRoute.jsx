import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
    children,
    allowedRoles
}) {

    const {
        user,
        isLoggedIn
    } = useAuth();


    if (!isLoggedIn) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    return children;
}


export default ProtectedRoute;