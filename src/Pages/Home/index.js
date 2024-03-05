import React, { useEffect, useRef, useState } from "react";
import AllTabs from "./Components/AllTabs";
import NavigationFolder from "./Components/NavigationFolder";
import TabFolderIcon from "../../Assets/Images/tabFolderIcon.png";
import FolderPath from "./Components/FolderPath";
import AddFilesButton from "./Components/AddFilesButton";
import AllFiles from "../../Components/Others/Files/index.js";
import PageSettings from './Components/PageSettings.jsx'
import {HomeFiles} from '../../Apis/Api.js'

function Index() {

  const [closeFolderPath, setCloseFolderPath] = useState(false);
  const [openSettings,setOpenSettings]=useState(false);
  
  // const [coords, setCoords] = useState({x: 0, y: 0});
  const homeSettingsRef=useRef()

    const handleWindowMouseMove = event => {
      const x = event.clientX;
      const y = event.clientY;

      event.preventDefault();
      setOpenSettings(true);
      console.log(homeSettingsRef,x,y);
      homeSettingsRef.current.style.left=`${x-210}px`;
      homeSettingsRef.current.style.top=`${y}px`;
      // setCoords({
      //   x: event.clientX,
      //   y: event.clientY,
      // });
    };


    
  
  return (
  
  <div className="w-full h-full bg-green-00 flex justify-end  text-4xl">
      
      <div className={`${ closeFolderPath ? "w-full" : "w-minus-250px" } h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out`}>
      
        <div className="w-full h-[35px] bg-green-00 flex items-center ">
      
          <AllTabs />

          <div className="w-[40px] h-full hover:cursor-pointer rounded-full bg-#0002] center">
      
            <img src={TabFolderIcon} className="h-[18px] hover:h-[19px]" onClick={() => setCloseFolderPath(false)} />
      
          </div>
      
        </div>
      
        <div className="w-full h-[45px]">
      
          <FolderPath />
      
        </div>
      
        <div className="w-full h-minus-150px bg-green-00 px-1 bg-red-000 "  onContextMenu={handleWindowMouseMove} >
      
          <AllFiles data={HomeFiles}/>
      
          <div className={`absolute ${ openSettings ? "flex" : "hidden" }`} ref={homeSettingsRef}>
            <PageSettings closeSetting={()=>setOpenSettings(false)}/>
          </div>
      
        </div>
      
        <div className="w-full h-[70px] flex bg-green-00 relative justify-between items-end px-2 pb-2">
      
          <div className="flex gap-2 text-sm font-medium ">
      
            <span>5 Folders</span>
      
            <span>Size 1.5Gb</span>
      
          </div>

      
          <div className="absolute bottom-2 right-2">
      
            <AddFilesButton />
      
          </div>
      
        </div>
      
      </div>

      <div className={`${ closeFolderPath ? "w-[0px]" : "w-[250px]" } transition-all delay-70 duration-400 ease-in-out h-full ${ closeFolderPath ? null : "border-l-[1.5px] border-[#B3B3B3]" } `} >
 
        <NavigationFolder closeFolders={() => setCloseFolderPath(true)} />
      
      </div>
    
    </div>
  
  );
}

export default Index;
