import React from 'react'
import { useGetAllLoansQuery, useUpdateLoanMutation } from '../../services/LoansApi'

function ManagerHome() {

    var {isLoading:isLoansLoading,data:allLoans}=useGetAllLoansQuery()
    var[updateLoanMutationFn]=useUpdateLoanMutation();
    function approve(loan){
      var temp=JSON.parse(JSON.stringify(loan))
      temp.status.push({
        code:'approved',
        timestamp:Date.now()
      })
      updateLoanMutationFn(temp).then(res=>{

      })
    }
    function disburse(loan){
      var temp = JSON.parse(JSON.stringify(loan));
      temp.status.push({
        code:"disbursed",
        timestamp:Date.now()
      })
      var emis = [];
      var totalInterest = (temp.productcost-temp.downpayment)*(temp.intrest.rateofinterest/100)
      var totalLoanAmount = (temp.productcost-temp.downpayment)+totalInterest;
      var emi = totalLoanAmount/temp.intrest.tenure;


      console.log("intrest",totalInterest)
      console.log("intrest",emi)
      for(var i=1; i<=temp.intrest.tenure;i++){
        emis.push({
          "emiAmount":emi,
          "emiDate":Date.now()+(30*24*60*60*1000)*i
        })
      }
      temp.emis=[...emis]
      updateLoanMutationFn(temp).then((res)=>{console.log(res)})
    }
  return (
    <div>
      <h2>Loans</h2>
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
                !isLoansLoading && allLoans.map((loan)=>{
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
                          <button onClick={()=>{approve(loan)}}>Approve</button>
                          <button>Reject</button>
                              </>
                          }
                          {
                              [...loan.status].sort((a,b)=>{
                                return a.timestamp>b.timestamp?-1:1
                              })[0].code==="disbursed" &&
                              <>
                          <i>Emis pending</i>
                              </>
                          }
                          {
                              [...loan.status].sort((a,b)=>{
                                return a.timestamp>b.timestamp?-1:1
                              })[0].code==="downpayment received" &&
                              <>
                          <button onClick={()=>{disburse(loan)}}>Disburse</button>
                          <button>Reject</button>
                              </>
                          }
                          {
                              [...loan.status].sort((a,b)=>{
                                return a.timestamp>b.timestamp?-1:1
                              })[0].code==="approved" &&
                              <>
                              <i>waiting for Downpayment</i>
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

export default ManagerHome