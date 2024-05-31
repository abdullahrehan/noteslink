import React, { useContext } from 'react'
import profile from "../../../Assets/Images/profile.png";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { LuHelpCircle } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from '../../../Context_Api/AppContext.js'

 
function Account() {

    const {state,dispatch}=useContext(AppContext)

    const navigate = useNavigate();

    const logOutFunc=()=>{
        dispatch({ type: 'setOpenAccountSettings', setOpenAccountSettings:false})        
        dispatch({ type: 'setLogoutPopup', logoutPopupAction:true})
        
       
    }

    const openFeedbackForm=()=>{
        dispatch({ type: 'setOpenAccountSettings', setOpenAccountSettings:false})        
        dispatch({ type: 'setShowFeedbackForm', showFeedbackFormAction:true})
        
    }

    const openPolicyForm=()=>{
        dispatch({ type: 'setOpenAccountSettings', setOpenAccountSettings:false})        
        dispatch({ type: 'setShowPrivacyForm', showPrivacyFormAction:true})
        
    }
    
    const openAccountSetting=()=>{
        dispatch({ type: 'setOpenAccountSettings', setOpenAccountSettings:false})        
        dispatch({ type: 'setShowAccountSettings', showAccountSettingsAction:true})
        
    }

    return (
        <div className='w-[260px] h-[310px] shadow-lg center bg-[#EAEAEA]  bg-gradient-to-tr from-[#A9A9A9] to-white rounded-[4px] rounded-[2px] flex flex-col items-center gap-1 '>
            <div className='w-[98%] h-[98%] bg-white'>
                <div className='w-full h-[42%] flex items-center shadow-lg justify-center pb-0 flex-col border-b-[0px]  border-[#A6A6A6] '>
                    <div className='flex gap-2 w-full pl-2'>
                        <div className='flex center flex-col gap-2'>
                            <div className='w-[65px] h-[65px] border-2 overflow-hidden rounded-full '>
                                <img alt='null' src={state.profilePic} className='w-full h-full' />
                            </div>
                            {/* <div className='text-sm text-red-400 font-medium'>
                                1 Strike
                            </div> */}
                        </div>
                        <div className='pl-2'>

                            <div className='  flex flex-col'>
                                <div className='font-medium text-lg'>{state.name?.split(" ")[0]+" "+state.name?.split(" ")[1]}</div>
                                <div className='text-sm text-[#4F4F4F]'>{state.email}</div>
                                <div className='text-sm text-[#4F4F4F]'>100 Follower</div>
                            </div>

                            <div className='pt-3 font-medium text-[#097B7B] text-sm hover:cursor-pointer hover:underline  hover:underline-offset-1 pt- '>
                                View Account
                            </div>

                        </div>
                    </div>
                </div>

                <div className='w-full h-[52%]  pl-6 pr-6 flex flex-col justify-around pt-4'>
                    <div className='flex items-center bg-red-00 hover:bg-[#E1E1E1] hover:cursor-pointer py-2 rounded-[4px]'>
                        <div className='pl-2 pr-2'><IoSettingsOutline size={22} /></div>                        
                            <div className='pl-4' onClick={openAccountSetting}>Account Setting</div>

                    </div>
                    <div className='flex items-center hover:bg-[#E1E1E1] hover:cursor-pointer py-2 rounded-[4px]'>
                        <div className='pl-2 pr-2'><MdLogout size={22} /></div>
                            <div className='pl-4' onClick={logOutFunc}>logout</div>
                    </div>

                    <div className='flex items-center hover:bg-[#E1E1E1] hover:cursor-pointer py-2 rounded-[4px] '>
                        <div className='pl-2 pr-2'><MdOutlineFeedback size={22} /></div>
                            <div className='pl-4' onClick={openFeedbackForm}>Send Feedback</div>
                    </div>
                    <div className='flex items-center hover:bg-[#E1E1E1] hover:cursor-pointer py-2 rounded-[4px]'>
                        <div className='pl-2 pr-2'><LuHelpCircle size={22} /></div>
                            <div className='pl-4' onClick={openPolicyForm}>Privacy Policy</div>
                    </div>

                </div>
          
            </div>
        </div>
    )
}

export default Account
