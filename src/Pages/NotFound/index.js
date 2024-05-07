import React, { useContext } from 'react'
import pageNotFound from '../../Assets/Images/pageNotFound.png'
import AppContext from '../../Context_Api/AppContext.js'
import { NavLink, useNavigate } from "react-router-dom";

function Index() {
  const {state,dispatch}=useContext(AppContext)
  const navigate = useNavigate();

  const goToHome=()=>{
    if(state.isAdmin){
      navigate("/admin")
      console.log("/auth");

    }
    else{
      navigate("/noteslink")
      console.log("/noteslink");

    }
  }

  return (
    <div className="w-full flex flex-col h-full bg-green-00 center font-medium text-4xl">
      {/* <h4>Not Found</h4> */}
      <img src={pageNotFound} className='h-[70%]'/>
      <div className='H-[10%]'>

      <button className='p-2 bg-green-400 rounded-full text-lg ' onClick={goToHome}>Home Page</button>
      </div>
    </div>
  )
}

export default Index
