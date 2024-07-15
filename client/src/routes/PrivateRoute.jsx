import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider.jsx';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    const Location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname} replace={true}></Navigate>

};

export default PrivateRoute;