import React, {useEffect} from 'react'
import Navbar from './Navbar'
import { Outlet,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  var {user}=useSelector(state=>state.loginReducer);
  var navigate=useNavigate();
  useEffect(()=>{
    console.log(user)
    navigate(`/${user.role}`)
  },[user])
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Home