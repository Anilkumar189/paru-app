import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLoginStatus } from './LoginSlice'

function Login() {
  var dispatch=useDispatch()
    var loginForm=useFormik({
        initialValues:{
            username:"",
            password:""
        },
        onSubmit:(values)=>{
          fetch("http://localhost:4000",{
            method:"POST",
            headers:{
             "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
          }).then((res)=>{return res.json()}).then(data=>{
            console.log(data)
            if(data.msg==='loginsuccess'){
              window.localStorage.setItem("user",JSON.stringify(data))
              dispatch(updateLoginStatus({status:true,user:data}))
            }
          })
        }
    })
  return (
    <center>
      <div>
      <div>
      <h1>Login</h1>
      <form onSubmit={loginForm.handleSubmit}>
        <input type="text" {...loginForm.getFieldProps("username")}/> <br />
        <input type="text" {...loginForm.getFieldProps("password")} /> <br />
        <br />
        <button>Login</button>
      </form>
    </div>
    </div>
    </center>
  )
}

export default Login