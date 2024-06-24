import React, { useContext, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import profile from "../../../Assets/Images/profile.png";
import userImage from "../../../Assets/Images/user.png";
import Account from "./Account";
import Notification from './Notification'
import AppContext from '../../../Context_Api/AppContext.js'

function Index({menuButton,heading}) {

  const {state,dispatch}=useContext(AppContext)

  const {openNotifications,openAccountSettings}=state;
 
  const openNotification=()=>{
    openNotifications ? 
    dispatch({ type: 'setOpenNotifications', openNotificationsAction:false})
   :     dispatch({ type: 'setOpenNotifications', openNotificationsAction:true})
   dispatch({ type: 'setOpenAccountSettings', openAccountSettingsAction:false})
  }
 
  const openAccountSettingFunction=()=>{

    openAccountSettings ?    dispatch({ type: 'setOpenAccountSettings', openAccountSettingsAction:false})
    :    dispatch({ type: 'setOpenAccountSettings', openAccountSettingsAction:true})
 
    dispatch({ type: 'setOpenNotifications', openNotificationsAction:false})
    }


    

  return (
    <>
      <div className="bg-[#2D2D2D] h-[95%] flex justify-between ">
        <div className="bg-blue-00 flex">
          <div className="w-[60px] hover:cursor-pointer center">
            <div className="w-[43px] h-[43px] hover:bg-[#0003] rounded-full center" onClick={menuButton}>
              <FiMenu size={22} color="white" />
            </div>
          </div>
          <div className="text-2xl font-medium center text-white">
            {heading}
          </div>
        </div>
        <div className="bg-blue-00 flex ">
          <div className="center h-full hover:cursor-pointer" onClick={openNotification}>
            {/* <div className={`w-[43px] h-[43px] bg-green-00 relative   ${openNotifications ? "bg-[#0003]": null} hover:bg-[#0003] rounded-full center`}>
              // {/* <div className="w-[15px] h-[15px] bg-red-500 z-10 rounded-full absolute right-1 top-2 text-[10px] center text-white">9</div> */}
              {/* <FaRegBell size={22} color="white" className="relative z-0" /> */}
            {/* </div>  */}
          </div>
          <div className="pl-2 center h-full pr-4 center bg-red-00">
            <div className={`w-[45px] h-[45px] rounded-full center bg-red-00 hover:cursor-pointer  ${openAccountSettings ? "bg-gradient-to-tr from-pink-400 to-blue-400 ":null} transition duration-700 ease-in-out`} onClick={openAccountSettingFunction}>
              <div className="w-[93%] h-[93%] rounded-full center overflow-hidden">
              <img src={state.profilePic ? state.profilePic : userImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute z-10 right-0 mt-1 mr-1 ${openAccountSettings ? "flex" : "hidden"}`}>
        <Account />
      </div>
      <div className={`absolute z-10 right-0 mt-1 mr-[70px] ${openNotifications ? "flex" : "hidden"}`}>
      <Notification/>
      </div>
    </>
  );
}

export default Index;
