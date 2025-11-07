import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminGaurd = () => {

    const data = JSON.parse(localStorage.getItem('shopsphere'))

    if (data === null) {
      return (
        <Navigate to='/login' />
      )
  
    }
  
    if (data.role === 'user') {
      return (
        <Navigate to='/' />
      )
  
    }

  return <Outlet/>
}

export default AdminGaurd
