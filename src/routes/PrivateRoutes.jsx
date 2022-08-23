import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {

  const { auth } = useContext(AuthContext);

  /* localstorage */
 





  return auth.logged
    ? children
    : <Navigate to="/login" />
}

export default PrivateRoutes