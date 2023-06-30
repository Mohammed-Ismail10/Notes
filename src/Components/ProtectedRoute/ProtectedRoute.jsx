import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { saveUserData } from '../../Redux/LoginSlice.js';

export default function ProtectedRoute({ children }) {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveUserData());
  }, [])




  if (localStorage.getItem('token')) {
    return children;
  }

  else {
    return <Navigate to={'/login'} />
  }

}
