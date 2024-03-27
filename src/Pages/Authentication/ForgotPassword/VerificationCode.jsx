import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

function VerificationCode() {

    return (

        <div className='w-[90%] flex flex-col '>

            <div className='w-full py-3 bg-red-00 text-2xl font-medium flex items-center justify-between '>

                <div className='W-[50px] bg-red-00'>
                    <NavLink to="/email">

                        <IoMdArrowRoundBack size={22} className='hover:cursor-pointer' />
                    
                    </NavLink>
                </div>

                <div className="w-full bg-green-00 center">

                    Verfication Code

                </div>

                <div className='W-[50px] bg-red-00 opacity-0'>/</div>

            </div>


            <div className='w-full py-2 bg-red-00 text-gray-600 text-base  flex items-center '>

                Please Enter the verification code you received on your email .

            </div>

            <div className='py-2 w-full flex gap-4 center'>

                <input
                    type="text"
                    id="number"
                    className="bg-gray-50 border text-center text-xl center border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-[50px] p-2.5 outline-none"
                    name="number"
                    placeholder="0"
                    // onChange={onEmailChange}
                    required
                />

                <input
                    type="text"
                    id="number"
                    className="bg-gray-50 border text-center text-xl center border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-[50px] p-2.5 outline-none"
                    name="number"
                    placeholder="0"
                    // onChange={onEmailChange}
                    required
                />
                 <input
                    type="text"
                    id="number"
                    className="bg-gray-50 border text-center text-xl center border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-[50px] p-2.5 outline-none"
                    name="number"
                    placeholder="0"
                    // onChange={onEmailChange}
                    required
                />
                 <input
                    type="text"
                    id="number"
                    className="bg-gray-50 border text-center text-xl center border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-[50px] p-2.5 outline-none"
                    name="number"
                    placeholder="0"
                    // onChange={onEmailChange}
                    required
                />

            </div>

            <div className='py-2 pb-3 w-full flex flex-co text-gray-500 gap-1 text-sm  '>


                Didn't receive code ?

                <div className='underline underline-offset-1 '> Resend Code </div>

            </div>

            <div className='w-full center py-2 flex-col pb-4'>

                <button className='px-5 py-3 bg-[#535353] hover:cursor-pointer hover:bg-[#2D2D2D] rounded-[4px] text-white text-base' >
                
                    <NavLink to="/updatepassword">

                        Submit
                
                    </NavLink>
                
                </button>

            </div>

        </div>
    )
}

export default VerificationCode
