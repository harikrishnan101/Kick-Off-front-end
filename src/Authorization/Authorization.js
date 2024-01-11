import React from "react";
import{ useLocation,Navigate,Outlet} from 'react-router-dom'


export function Authorization() {
  const token=localStorage.getItem('token')
  const user=JSON.parse(localStorage.getItem('user'))
  return(
    (token && user.role===2)?<Outlet/>:<Navigate to='/'/>
    )
}

export function LoginpageAuth(){
    const token=localStorage.getItem('token')
    return(
        token?<Navigate to='/home'/>:<Outlet/>
    )
}