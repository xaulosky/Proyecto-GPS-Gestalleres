import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContex';
import { Navigate } from 'react-router-dom';
const TopBar = () => {

  const { auth } = useContext(AuthContext);
  if (auth.logged)
    return <h1>Hola</h1>
  else
    return <Navigate to="/"  />



}

export default TopBar;