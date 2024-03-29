import React, { useState } from 'react';
import { CiWarning } from "react-icons/ci";
import { NavLink , useNavigate } from "react-router-dom";
// import { redirect } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState(null);
  const navigate = useNavigate ();
  const errors = ["All Fields Are Mandatory", "Invalid Username or Password"];

  const onEmailChange = (event) => {
  
    setEmail(event.target.value);
  
  };

  const onPasswordChange = (event) => {
  
    setPassword(event.target.value);
  
  };

  const onLogin = () => {
  
    if(email.length==0 || password.length==0){
  
      setLoginErrors(0)

    }
  
    else{
  
      setLoginErrors(null)
      navigate("/noteslink")
  
    }
  
  };

  return (
  
  <div className='w-[90%] center flex flex-col'>
  
      <div className='py-2 w-full flex flex-col gap-4'>
  
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
          name="email"
          placeholder="email"
          onChange={onEmailChange}
          required
        />
  
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
          name="password"
          placeholder="Password"
          onChange={onPasswordChange}
          required
        />
  
      </div>

      <div className='w-full text-sm underline underline-offset-1 text-gray-500 py-2 hover:cursor-pointer'>
  
        <NavLink to="/email">

          Forgot Password?

        </NavLink>

      </div>

      <div className={`flex gap-1 py-3 px-1 text-red-500 w-full center text-sm ${loginErrors !== null ? "center" : "hidden"}`}>
  
        <CiWarning color='red' /> {errors[loginErrors]}
  
      </div>

      <div className='w-full center py-1 pb-4 flex-col'>
  
        <button className='px-5 py-3 bg-[#535353] hover:cursor-pointer hover:bg-[#2D2D2D] rounded-[4px] text-white text-base' onClick={onLogin}>
  
          LogIn
  
        </button>
  
      </div>
  
    </div>
  );
}

export default Login;
