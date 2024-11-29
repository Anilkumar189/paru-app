import React from 'react'
import { Outlet } from 'react-router-dom'

function ManagerDashboard() {
  return (
    <div>
      <h1>ManagerDashboard</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default ManagerDashboard