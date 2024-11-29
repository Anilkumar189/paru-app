import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUpdateLoanMutation } from '../../services/LoansApi';

function AgentDownPaymentForm() {
    var {state:loan} = useLocation();
    console.log(loan)
    var [UpdateLoanFn]=useUpdateLoanMutation()
    // console.log(loan)
    function downpaymentReceived(){
      var temp = JSON.parse(JSON.stringify(loan))
      temp.status.push({
        code:"downpayment received",
        timestamp:Date.now()
      })
      UpdateLoanFn(temp).then((res)=>(console.log(res)))
    }
  return (
    <div>
    AgentDownPaymentForm
    <h4>{loan.loanitem}</h4>
    <h4>{loan.downpayment}</h4>
    <h4>{loan.customerMobile}</h4>
    <button onClick={()=>{downpaymentReceived()}}>Received</button>
    </div>
  )
}

export default AgentDownPaymentForm