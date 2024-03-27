import React, { useState } from "react";
import Login from './Login'
import SignUp from './SignUp'

function Index() {

  const [page,setPage]=useState("login")

  let login = page=="login" 
  let signup = page=="signup" 

  return (
   
    <>
    
      <div className="flex w-full  h-[60px] justify-around items-center ">

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
      
      <div className="center w-full">
      
        {login ? <Login/> : signup ? <SignUp/> : null}
      
      </div>
    
    </>
  );
}

export default Index;
