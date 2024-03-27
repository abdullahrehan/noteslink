import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { NavLink } from "react-router-dom";

function UpdatePassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatePasswordErrors, setUpdatePasswordErrors] = useState(null);

    const errors = [
        "All Fields Are Mandatory",
        "Password must be 8 letter long",
        "Password do not match"
    ]

    const resetPassword=()=>{

        if(password.length==0 || confirmPassword.length==0){
            setUpdatePasswordErrors(0)
        }
        else if(password.length<8){
                setUpdatePasswordErrors(1)
        }
        else if(confirmPassword!==password){
            setUpdatePasswordErrors(2)

        }
        else{
            
            setUpdatePasswordErrors(null)

            // Api
        }
    }

    return (

        <div className='w-[90%] flex flex-col '>

            <div className='w-full py-3 bg-red-00 text-2xl font-medium flex items-center justify-between '>

                <div className='W-[50px] bg-red-00'>

                <NavLink to="/verificationcode">

                    <IoMdArrowRoundBack size={22} className='hover:cursor-pointer' />
                </NavLink>
                </div>

                <div className="w-full bg-green-00 center">

                    Update Password

                </div>

                <div className='W-[50px] bg-red-00 opacity-0'>/</div>

            </div>

            <div className='py-2 w-full flex flex-col gap-4'>

                <input
                    type="text"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    value={password}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="text"
                    id="confirm password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    value={confirmPassword}
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

            </div>

            
            <div className={`w-full py-2 bg-red-00 text-red-500 text-sm gap-1 ${updatePasswordErrors !== null ? "flex items-center" : "hidden"}`}>

            <CiWarning color='red' />{errors[updatePasswordErrors]}

            </div>

            <div className='w-full center py-2 flex-col pb-4'>

                <button className='px-5 py-3 bg-[#535353] hover:cursor-pointer hover:bg-[#2D2D2D] rounded-[4px] text-white text-base' onClick={resetPassword}>
                
                    <NavLink to="/passwordchanged">

                        Update
                
                    </NavLink>
                
                </button>

            </div>

        </div>
    )
}

export default UpdatePassword
