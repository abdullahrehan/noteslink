import React from "react";
import MenuButton from "./MenuButton";
import HomeIcon from "../../../Assets/Images/home-icon.png";
import feedback from "../../../Assets/Images/feedback.png";
import Complaints from "../../../Assets/Images/complaint.png";
import { VscFeedback } from "react-icons/vsc";

function AdminSidebar({openMenu}) {

    const menuIcons = [
    {
      name: "Home",
      icon: <img src={HomeIcon} className="w-[28px]" />,
      path: "/admin/",
    },
    {
      name: "Complaints",
      icon: <img src={feedback} className="w-[28px]" />,
      path: "/complaints",
    },
    // {
    //   name: "Feedback",
    //   icon: <img src={Complaints} className="w-[35px]" />,
    //   path: "/feedback",
    // },
   
  ];

  
  return (
    
    <div className=" h-full w-full pt-2 pb-2 rounded-r-[5px] flex flex-col transition-all delay-700 duration-300 ease-in-out ">
    
      <div className="h-1/2 w-full gap-2 flex flex-col items-center pt-[6px]">
    
        { menuIcons.map((data , index) => ( <MenuButton key={index} name={data.name} icon={data.icon} path={data.path} openMenu={openMenu}/> ))}
      
      </div>

    </div>

);
}

export default AdminSidebar;