import React, { useContext, useEffect } from 'react'
import pageNotFound from '../../Assets/Images/pageNotFound.png'
import AppContext from '../../Context_Api/AppContext.js'
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function HomeReRoute() {
  const {state,dispatch}=useContext(AppContext)
  const navigate = useNavigate();


  useEffect(()=>{
    const isAdmin=Cookies.get("isAdmin")
    if(isAdmin==="true"){
        navigate("/admin")
        console.log("/admin",isAdmin)
  
      }
      else {
        navigate("/noteslink")
        console.log("/noteslink",isAdmin)  
      }  },[])

  return (
        <>Hello</>
  )
}

export default HomeReRoute
