import React from 'react'
import { useFormik } from 'formik'
import { useAddLoanMutation, useAddUserMutation, useGetAllLoanTypesQuery } from '../../services/LoansApi'
import { useGetAllIntrestratesTypesQuery } from '../../services/InterestApi'
import { useNavigate } from 'react-router-dom'


function AgentForm() {
  var navigate = useNavigate()
  var {isLoading:isLoantypeloading,data:loantypes}=useGetAllLoanTypesQuery()
  var {isLoading:isInterestRatesloading,data:interestRates}=useGetAllIntrestratesTypesQuery()
  var [addLoanFn]=useAddLoanMutation()
  var [addUserFn] = useAddUserMutation()
  var loanForm=useFormik({
    initialValues:{
      "customerMobile":"",
      "email":"",
      "typeofloan":"",
      "loanitem":"",
      "productcost":0,
      "intrest":null,
      "downpayment":0,
      "status":[
        {
          "code":"applied",
          "timestamp":(new Date()).getTime()
        }
      ]
    },
    onSubmit:(values)=>{
      values.intrest=JSON.parse(values.intrest)
      addLoanFn(values).then(res=>{navigate(`/agent/`)})
      addUserFn({
        "username":values.email,
        "password":123,
        "role":"customer",
        "mobile":values.customerMobile
      })
    }
  })

  return (
    <div>
      <h1>AgentForm</h1>
      <form onSubmit={loanForm.handleSubmit}>
        <input type="text" {...loanForm.getFieldProps("customerMobile")} placeholder='Mobile'/>
        <br />
        <input type="text" {...loanForm.getFieldProps("email")} placeholder='email'/>
        <br />
        <select {...loanForm.getFieldProps('typeofloan')}>
          <option value="null" disabled selected>Please select the Loan Type</option>
          {
            !isLoantypeloading && loantypes?.map((slt)=>{
              return <option>{slt}</option>
            })
          }
        </select>
          <br />
        <input type="text" {...loanForm.getFieldProps("loanitem")} placeholder='loanitem'/>
        <br />
        <input type="text" {...loanForm.getFieldProps("productcost")} placeholder='productcost'/>
        <br />
        <select {...loanForm.getFieldProps('intrest')}>
          <option value="null" disabled selected>Please Select InterestRates</option>
          {
            !isInterestRatesloading && interestRates?.map((lr)=>{
              return <option value={JSON.stringify(lr)}>{`${lr.rateofinterest}% for ${lr.tenure} ${lr.tenuretype}`}</option>
            })
          }
        </select>
        <br />
        <input type="text" {...loanForm.getFieldProps("downpayment")} placeholder='downpayment'/>
        <br />
        <button>Apply Loan</button>
      </form>
    </div>
  )
}

export default AgentForm