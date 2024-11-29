import React from 'react'
import { useGetAllLoansQuery } from '../../services/LoansApi'
import { Link } from 'react-router-dom'

function AgentHome() {
      var {isLoading:isLoansLoading,data:allLoans}=useGetAllLoansQuery()
  return (
    <div>
      <h1>Loans</h1>
      <table className='table table-striped'>
        <thead>
        <tr>
            <th>Mobile</th>
            <th>Email</th>
            <th>Loan item</th>
        </tr>
        </thead>
        <tbody>
            {
                !isLoansLoading && allLoans?.map((loan)=>{
                    return <tr>
                        <td>{loan.customerMobile}</td>
                        <td>{loan.email}</td>
                        <td>{loan.loanitem}</td>
                        <td>
                          {
                            [...loan.status].sort((a,b)=>{
                              return a.timestamp>b.timestamp?-1:1
                            })[0].code==="applied" && 
                              <>
                              <i>Waiting for Manager Loan Approval...</i>
                              </>
                          }
                          {
                            [...loan.status].sort((a,b)=>{
                              return a.timestamp>b.timestamp?-1:1
                            })[0].code==="downpayment received" && 
                              <>
                              <i>Waiting for Manager Disbursment Approval...</i>
                              </>
                          }
                           {
                            [...loan.status].sort((a,b)=>{
                              return a.timestamp>b.timestamp?-1:1
                            })[0].code==="approved" && 
                              <>
                              <Link to="/agent/downpaymentForm" state={loan}>Take Downpayment</Link>  
                              </>
                          }
                        </td>
                    </tr>
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default AgentHome