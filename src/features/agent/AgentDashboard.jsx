import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AgentDashboard() {
  return (
    <div>
      <h1>AgentDashboard</h1>
      <Link to="/agent/addLoan">Add Loan</Link>
      <Outlet></Outlet>
    </div>
  )
}

export default AgentDashboard