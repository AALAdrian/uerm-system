import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({loginStatus, children}) {
  if(!loginStatus){
    return <Navigate to='/'/>
  }
  return children
}

export default ProtectedRoute