import React from "react";
import MenuButton from "./MenuButton";
import HomeIcon from "../../../Assets/Images/home-icon.png";
import SavedFile from "../../../Assets/Images/saved-file-icon.png";
import SearchFile from "../../../Assets/Images/search-file-icon.png";
import SharedIcon from "../../../Assets/Images/shared-icon.png";
import CloudIcon from "../../../Assets/Images/cloud-icon.png";
import recycleBinIcon from "../../../Assets/Images/recyclebin-icon.png";
import ServiceCenter from "../../../Assets/Images/service-center.PNG";

function index({openMenu}) {
  const menuIcons = [
    {
      name: "Home",
      icon: <img src={HomeIcon} className="w-[28px]" />,
      path: "/noteslink/",
    },
    {
      name: "Saved Files",
      icon: <img src={SavedFile} className="w-[28px]" />,
      path: "/savedfiles",
    },
    {
      name: "Search Files",
      icon: <img src={SearchFile} className="w-[28px]" />,
      path: "/seachfiles",
    },
    {
      name: "Shared Files",
      icon: <img src={SharedIcon} className="w-[28px]" />,
      path: "/publicfiles",
    },
  ];

  const menuSettingsIcons = [
    {
      name: "Deleted Files",
      icon: <img src={recycleBinIcon} className="w-[30px]" />,
      path: "/deletefiles",
    },
    {
      name: "Service Center",
      icon: <img src={ServiceCenter} className="w-[28px]" />,
      path: "/service-center",
    },
    {
      name: "Storage",
      icon: <img src={CloudIcon} className="w-[28px]" />,
      path: "/storage",
    },
  ];

  return (
    <div className=" h-full w-full pt-2 pb-2 rounded-r-[5px] flex flex-col transition-all delay-700 duration-300 ease-in-out ">
      <div className="h-1/2 w-full gap-2 flex flex-col items-center pt-[6px]">
        {menuIcons.map((data) => (
          <MenuButton name={data.name} icon={data.icon} path={data.path} openMenu={openMenu}/>
        ))}
      </div>
      <div className="h-1/2 w-full flex flex-col gap-2 justify-end items-center pb-2">
        {menuSettingsIcons.map((data) => (
          <MenuButton name={data.name} icon={data.icon} path={data.path} openMenu={openMenu}/>
        ))}
      </div>
    </div>
  );
}

export default index;
