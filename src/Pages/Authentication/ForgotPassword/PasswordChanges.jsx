import React from 'react'
import { NavLink } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import doneVector from '../../../Assets/Images/done.png'


function PasswordChanges() {
  return (
        <div className='w-[90%] flex flex-col '>

        <div className='w-full py-3 bg-red-00 text-2xl font-medium flex items-center justify-between '>

            <div className='W-[50px] bg-red-00'>

                <NavLink to="/updatepassword">

                    <IoMdArrowRoundBack size={22} className='hover:cursor-pointer' />
            
                </NavLink>
         
            </div>

            <div className="w-full bg-green-00 center">

                Password Updated

            </div>

            <div className='W-[50px] bg-red-00 opacity-0'>/</div>

        </div>

        <div className='w-full py-2 bg-red-00 text-gray-600 text-base  flex items-center '>

            Your Password has been updated successfully

        </div>

        <div className='w-full py-2 pb-4 bg-red-00 text-gray-600 text-base center '>

            <img src={doneVector} className='h-[180px]'/>

        </div>
        
        
  

        <div className='w-full center py-2 flex-col pb-4'>

            <button className='px-5 py-3 bg-[#535353] hover:cursor-pointer hover:bg-[#2D2D2D] rounded-[4px] text-white text-base' >

                <NavLink to="/auth">

                     Back to Login
            
                </NavLink>
            
            </button>

        </div>

    </div>
  )
}

export default PasswordChanges
