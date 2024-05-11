import React, { useEffect, useRef, useState } from "react";
import Login from './Login'
import SignUp from './SignUp'
import loader from '../../../Assets/Images/loader.gif'
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from "react-router-dom";

function Index() {

  const [page,setPage]=useState("login")
  const [loginSuccessfull,setLoginSuccessfull]=useState(false)
  const [signUpSuccessfull,setSignUpSuccessfull]=useState(false)

  let login = page=="login" 
  let signup = page=="signup" 
  
  let authDiv=useRef()
  const navigate = useNavigate();

  useEffect(()=>{
    if(Cookies.get("userEmail")){
      if(Cookies.get("isAdmin")=="true"){
        navigate("/admin")

      }else{
      navigate("/noteslink")
    }}

  },[])


  return (
   
    <div className="w-full relative " ref={authDiv}>

      <div className={`w-full `}>
    
      <div className={`z-10 w-full h-[60px] justify-around items-center ${signUpSuccessfull?"hidden":"flex"} `}>

        <div className="flex flex-col items-center hover:cursor-pointer hover:bg-[#F1F1F1] px-4 h-[90%] rounded-[2px] center " onClick={() => setPage("signup")}>
          
          <div className="py-1 font-semibold text-lg">
            
            SignUp
          
          </div>

          <div className={`w-[85px] ${signup ? "h-[2px]" : null}  bg-[#F8BD0D] `} ></div>
        
        </div>

        <div className="flex flex-col items-center hover:cursor-pointer hover:bg-[#F1F1F1] px-4 h-[90%] rounded-[2px] center" onClick={() => setPage("login")}>
          
          <div className="py-1 font-semibold text-lg">
            
            LogIn
          
          </div>

          <div className={`w-[85px] ${login ? "h-[2px]" : null}  bg-[#F8BD0D] `}> </div>
        
        </div>
      
      </div>
      
      <div className={`center w-full z-10 `}>
      
        {login ? <Login setLoginSuccessfull={(data)=>setLoginSuccessfull(data)}/> : signup ? <SignUp setSignUpSuccessfull={(data)=>setSignUpSuccessfull(data)}/> : null}
      
      </div>

      </div>
      <div className={`w-full z-20 h-[280px] bg-white z-10 blur-sm absolute top-0 left-0 ${loginSuccessfull?" ":"hidden"}`}>

      </div>
      
      <div className={`w-full z-30 absolute top-0 left-0 bg-[#0000] h-[296px] flex ${loginSuccessfull?" ":"hidden"} items-center flex-col rounded-[5px] gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>

        <div className="font-bold text-xl "></div>
        
        <div className="w-full h-full gap-5 flex items-center justify-center flex-col">

          <img src={loader} className='h-[50px] '/>
         
          <div className="text-gray-500">Account Loading....</div>
        
        </div>

      </div>

      <div className={`w-full z-30 absolute top-0 left-0 bg-white h-[310px] flex ${signUpSuccessfull?" ":"hidden"} items-center flex-col rounded-[5px] gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>

        <div className="font-bold text-xl "></div>
        
        <div className="w-full h-full gap-5 flex items-center justify-center flex-col">

          <img src={loader} className='h-[50px] '/>
         
          <div className="text-gray-500">Account Loading....</div>
        
        </div>

      </div>
    
    </div>
  );
}

export default Index;
