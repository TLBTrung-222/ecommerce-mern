import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    element: React.ReactElement
    isAdminRoute: boolean
    isAdminUser: boolean
}

function ProtectedRoute({ element, isAdminRoute, isAdminUser }: ProtectedRouteProps) {
    if (isAdminRoute && !isAdminUser) {
        return <Navigate to="/not-authorized" replace />
    }

    return element
}

export default ProtectedRoute
