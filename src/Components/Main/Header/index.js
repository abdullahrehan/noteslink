import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import profile from "../../../Assets/Images/profile.png";
import Account from "./Account";
import Notification from './Notification'

function Index({setOpenMenu}) {
  const [showAccountSetting, setShowAccountSetting] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  return (
    <>
      <div className="bg-[#2D2D2D] h-[95%] flex justify-between ">
        <div className="bg-blue-00 flex">
          <div className="w-[60px] hover:cursor-pointer center">
            <div className="w-[43px] h-[43px] hover:bg-[#0003] rounded-full center" onClick={setOpenMenu}>
              <FiMenu size={22} color="white" />
            </div>
          </div>
          <div className="text-2xl font-medium center text-white">
            NotesLink 1
          </div>
        </div>
        <div className="bg-blue-00 flex ">
          <div className="center h-full hover:cursor-pointer" onClick={()=>setShowNotifications(!showNotifications)}>
            <div className={`w-[43px] h-[43px] bg-green-00 relative   ${showNotifications ? "bg-[#0003]": null} hover:bg-[#0003] rounded-full center`}>
              <div className="w-[15px] h-[15px] bg-red-500 z-10 rounded-full absolute right-1 top-2 text-[10px] center text-white">9</div>
              <FaRegBell size={22} color="white" className="relative z-0" />
            </div>
          </div>
          <div className="pl-2 center h-full pr-4 center bg-red-00">
            <div className={`w-[45px] h-[45px] rounded-full center bg-red-00 hover:cursor-pointer  ${showAccountSetting ? "bg-gradient-to-tr from-pink-400 to-blue-400 ":null} transition duration-700 ease-in-out`} onClick={()=>setShowAccountSetting(!showAccountSetting)}>
              <div className="w-[93%] h-[93%] rounded-full center">
              <img src={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute right-0 mt-1 mr-1 ${showAccountSetting ? "flex" : "hidden"}`}>
        <Account />
      </div>
      <div className={`absolute right-0 mt-1 mr-[70px] ${showNotifications ? "flex" : "hidden"}`}>
      <Notification/>
      </div>
    </>
  );
}

export default Index;
