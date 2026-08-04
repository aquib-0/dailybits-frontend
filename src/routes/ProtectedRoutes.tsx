import { Navigate, useLocation } from "react-router-dom";

import type { ReactNode } from "react";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}: {children: ReactNode})
{
    const {isAuthenticated} = useAuth();  {/*loading*/}
    const location = useLocation();

    // if(loading)
    // {
    //     return <div>Loading...</div>
    // }

    if(!isAuthenticated)
    {
        return <Navigate to="/auth/login" replace state={{from: location}} />
    }

    return <>{children}</>
};