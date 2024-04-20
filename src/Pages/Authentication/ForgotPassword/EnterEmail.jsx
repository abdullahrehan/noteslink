import { getAuth, sendPasswordResetEmail, } from 'firebase/auth';
import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { auth } from '../../../Firebase/firebaseConfig';

function EnterEmail({ setForgotPassword }) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const handlePasswordReset = async () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                console.log("Sent")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (

        <div className='w-[90%] flex flex-col '>

            <div className='w-full py-3 bg-red-00 text-2xl font-medium flex items-center justify-between '>

                <div className='W-[50px] bg-red-00'>

                    <NavLink to="/auth">

                        <IoMdArrowRoundBack size={22} className='hover:cursor-pointer' onClick={setForgotPassword} />

                    </NavLink>

                </div>

                <div className="w-full bg-green-00 center">

                    Forgot Password

                </div>

                <div className='W-[50px] bg-red-00 opacity-0'>/</div>

            </div>


            <div className='w-full py-2 bg-red-00 text-gray-600 text-base  flex items-center '>

                Please Enter Your Email Address We'll send you a confirmation code

            </div>

            <div className='py-2 w-full flex flex-col gap-4'>

                <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

            </div>

            <div className={`py-1 w-full ${error ? "flex" : "hidden"} flex-col gap-4 text-sm font-medium text-red-500`}>

                we cannot find your email

            </div>

            <div className='w-full center py-2 flex-col pb-4'>

                <button className='px-5 py-3 bg-[#535353] hover:cursor-pointer hover:bg-[#2D2D2D] rounded-[4px] text-white text-base' onClick={handlePasswordReset} >

                    {/* <NavLink to="/verificationcode"> */}

                    Submit

                    {/* </NavLink> */}

                </button>

            </div>

        </div>

    )
}

export default EnterEmail
