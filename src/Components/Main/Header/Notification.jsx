import React from 'react'
import profile from "../../../Assets/Images/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiConfetti } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuSave } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import { LuFileWarning } from "react-icons/lu";
import { TiCloudStorage } from "react-icons/ti";
import { LuFileEdit } from "react-icons/lu";
import { RiFolderAddLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import "./style.css"

function Notification() {

    const notifications = [
        { icon: <PiConfetti size={24} />, text: "Congratulation on completing 100 followers", details: null },
        { icon: <BsPeople size={24} />, text: "2 New Follower Added", details: null },
        { icon: <VscFeedback size={24} />, text: "Thank message you for Feedback", details: null },
        { icon: <RiCustomerService2Line size={24} />, text: "help Response from service center", details: null },
        { icon: <RiFolderAddLine size={24} />, text: "1 new File added in react folder", details: { userImage: <img src={profile} className='w-full' />, userName: "Abdullah" } },
        { icon: <LuFileEdit size={24} />, text: "Major Changes in the nodejs file lorem Major Changes in the nodejs file lorem", details: { userImage: <img src={profile} className='w-full' />, userName: "Abdullah" } },
        { icon: <TiCloudStorage size={24} />, text: "You have used more than 80% Storage", details: null },
        { icon: <LuFileWarning size={24} />, text: "File removed due to inapprpriate content", details: null },
        { icon: <BiError size={24} />, text: "You cannot public any further file due to 3 stricks", details: null },
        { icon: <RiLockPasswordLine size={24} />, text: "Your password is change successfully  ", details: null },
        { icon: <LuSave size={24} />, text: "Saved Change in the mern file (Public)", details: null },
    ]

    return (
        // border-black border-t-[2px] border-r-[2px]

        <div className='w-[320px] h-[385px] flex flex-col  gap-[0px]'>


            <div className='w-full h-full relative shadow-lg center bg-[#EAEAEA]  bg-gradient-to--tr from-[#A9A9A9] to-white rounded-[4px] rounded-[2px] flex flex-col items-center gap-1'>
                {/* <div class="w-0 h-0  absolute right-0 top-[-14px]
            border-l-[11px] border-l-transparent
            border-b-[13px] border-b-[#EAEAEA]
            border-r-[11px] border-r-transparent">
                </div> */}
                <div className='w-[98%] h-[98%] bg-white flex items-center flex-col gap-[5px]'>
                    <div className='w-[95%] h-[10%] flex justify-between items-center  border-b-[1px] border-gray-300'>
                        <div className='font-medium textlg'>Notification</div>
                        <div className='text-sm text-red-400 hover:underline hover:underline-offset-1 hover:cursor-pointer'>Clear All</div>
                    </div>
                    <div className='w-[98%] h-[90%] flex flex-col gap-[5px] scrollbar  overflow-auto'>
                        {notifications.map(data =>
                            <div className='w-[99%] h-auto bg-gradient-to-tr from-[#A9A9A9]  to-white rounded-[4px] center'>
                                <div className='w-[98%] h-[94%] hover:bg-[#F4F4F4] hover:cursor-pointer flex  rounded-[2px] bg-white  shadow-md shadow-gray-300'>
                                    <div className='px-[6px] h-[80px] w-[16%] flex center'>
                                        {data.icon}
                                    </div>
                                    <div className='w-[2px] h-auto bg-gray-400 my-2'></div>
                                    <div className={`p-[10px] w-[74%] bg-red-00 flex flex-col items-start justify-between   text-sm`}>
                                        <div className={`${data.details !== null ? "pb-4" : null} bg-green-00`}> {data.text}</div>
                                        <div className={`w-full text-end  items-end bg-red-00 text-xs text-medium text-gray-400 flex ${data.details !== null ? "justify-between " : "justify-end" }`}>
                                            {data.details !== null ?
                                                <div className={`flex items-center gap-[5px] `}>
                                                    <div className='w-[20px] h-[20px] center rounded-full bg-red-00'>{data.details.userImage}</div>
                                                    <div>by {data.details.userName}</div>
                                                </div> : null}
                                            <div>2 min</div>
                                        </div>
                                    </div>

                                    {/* <div className='h-auto pt-2 w-[10%] flex justify-center'></div> */}
                                    <div className='h-auto pt-2 w-[10%] flex justify-center'>
                                    
                                        {/* <BsThreeDotsVertical size={20} /> */}
                                        <RxCross2 size={16} color='gray' className='hover:cursor-pointer'/>
                                    </div>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification

