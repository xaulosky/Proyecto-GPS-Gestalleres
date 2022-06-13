import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PublicRoutes = ({ children }) => {

    const { auth } = useContext(AuthContext);

    return auth.logged
        ? <Navigate to="/" /> 
        : children
}

export default PublicRoutes