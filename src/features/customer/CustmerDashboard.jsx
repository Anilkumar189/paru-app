import React from 'react'
import { Outlet } from 'react-router-dom'

function CustomerDashboard() {
  return (
    <div>
      <h1>CustomerDashboard</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default CustomerDashboard