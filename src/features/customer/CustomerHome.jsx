import React from 'react'
import { useSelector } from 'react-redux'
import { useGetLoanByMobileQuery } from '../../services/LoansApi'

function CustomerHome() {
  var {user} = useSelector(state=>state.loginReducer)
  var {isLoading,data}=useGetLoanByMobileQuery(user.mobile);
  console.log(data)
  console.log(user)
return (
  <div>
    <h1>CustomerHome</h1>
    <div className='d-flex'>
      <div className='w-50 border border-danger p-2 m-2'>
        <h2>Details</h2>
        <h3>Mobile::{user.mobile}</h3>
        {data&&<h3>UserName::{ data[0].email}</h3>}
        {data&&<h3>UserName::{ data[0].loanitem}</h3>}
      </div>

      {/* <div className='w-50 border border-danger p-2 m-2'>
            <h2>Status</h2>
            {
                !isLoading && data[0].emis.map((emi)=>{
                    return <li>
                        <b>{Math.floor(emi.emiAmount)}</b>
                        <br />
                        <i>{(new Date(emi.emiDate).toDateString())}</i>
                    </li>
                })
            }
        </div> */}
    </div>
  </div>
)
}

export default CustomerHome