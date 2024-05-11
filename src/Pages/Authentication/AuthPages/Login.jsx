import React, { useContext, useState } from 'react';
import { CiWarning } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, fdb } from '../../../Firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, getDocs, query, updateDoc, where, doc } from 'firebase/firestore';
import AppContext from "../../../Context_Api/AppContext.js";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import Cookies from 'js-cookie';

function Login({ setLoginSuccessfull }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState(null);
  const [showPassword, setShowPassword] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const errors = ["All Fields Are Mandatory", "Invalid Username or Password", "Something went wrong, please try again later!"];

  const onEmailChange = (event) => {

    setEmail(event.target.value);

  };

  const onPasswordChange = (event) => {

    setPassword(event.target.value);

  };

  const onLogin = () => {

    if (email.length == 0 || password.length == 0) {

      setLoginErrors(0)

    }

    else {

      setLoginErrors(null)
      signInWithEmailAndPassword(auth, email, password).then(async (data) => {
        setLoginSuccessfull(true)
       
        const q = await getDocs(
          query(
            collection(fdb, "users"),
            where("emailAddress", "==", data.user.email)
          )
        )
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {

              const { name, emailAddress, userType, status, limitTill } = doc.data();
              dispatch({ type: "setName", Name: name });
              dispatch({ type: "setEmail", Email: emailAddress });
              setLoginSuccessfull(false)
              dispatch({ type: "setRefreshData", refreshDataAction: true });
              

                if (status === "restricted") {

                  if (new Date().getTime() < limitTill) {
                    let date = new Date(limitTill).toDateString()
                    alert(`You are not allowed to login till ${date}`)
                  }
                  else {
                    await updateDoc(doc(fdb, "users", emailAddress), {
                      status: "open"
                    })
                    dispatch({ type: "setIsAdmin", isAdminAction: false });
                    navigate("/noteslink")
                  }
                }
                else{
                  if (userType === "admin") {
                    dispatch({ type: "setIsAdmin", isAdminAction: true });
                    Cookies.set('isAdmin', JSON.stringify(true), { expires: 7 });
                    navigate("/admin")
    
                  }
                  else{

                    Cookies.set('isAdmin', JSON.stringify(false), { expires: 7 });
                    navigate("/noteslink")

                  } 

                  localStorage.setItem('userEmail', email);
                  localStorage.setItem('isLogin', true);
                  Cookies.set('userEmail', JSON.stringify(email), { expires: 7 });
          
                  
                }

              

            });
          })
          .catch((e) => console.log(e));

      }).catch((e) => { 
        if(e.errorCode !== "auth/invalid-credential"){
          setLoginErrors([1])
        }
        else{
          setLoginErrors([2])
        }
       })

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

        <div className="py-2">
            
            <div className='bg-gray-50 h-full border flex border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>

            <input
                type={showPassword ? "text" : "password"}
                className="h-full bg-[#0000] w-[90%] outline-none"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
                required
            />

            <div className='h-full w-[10%] hover:cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ?
                    <GoEyeClosed size={20} />
                    :
                    <FiEye size={20} />
                }
            </div>

            </div>

        </div>

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
