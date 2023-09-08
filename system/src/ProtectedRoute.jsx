import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'

function ProtectedRoute({loginStatus}) {
  console.log(loginStatus)
  if(!loginStatus){
    return <Navigate to='/'/>
  }
  return <Outlet/>
}

export default ProtectedRoute