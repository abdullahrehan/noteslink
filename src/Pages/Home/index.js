import React, { useState } from "react";
import AllTabs from './Components/AllTabs'
import NavigationFolder from './Components/NavigationFolder'
import TabFolderIcon from '../../Assets/Images/tabFolderIcon.png'

function Index() {

  const [closeFolderPath,setCloseFolderPath] = useState(false)

  return (
    <div className="w-full h-full bg-green-00 flex justify-end  text-4xl">

      <div className={`${closeFolderPath ? "w-full" :"w-minus-250px"} h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out`}>
        <div className="w-full h-[35px] bg-green-00 flex items-center ">
          
          <AllTabs/>
          
          <div className="w-[40px] h-full hover:cursor-pointer rounded-full bg-#0002] center">
  
            <img src={TabFolderIcon} className='h-[18px] hover:h-[19px]' onClick={()=>setCloseFolderPath(false)} />

          </div>
        </div>
        <div className="w-full h-minus-110px bg-green-00 center">Home</div>
        <div className="w-full h-[70px] bg-green-00"></div>
      </div>

      <div className={`${ closeFolderPath ?  "w-[0px]":"w-[250px]" } transition-all delay-70 duration-400 ease-in-out h-full ${closeFolderPath ? null : "border-l-[1.5px] border-[#B3B3B3]"} `} >
        <NavigationFolder closeFolders={()=>setCloseFolderPath(true)}/>
      </div>
    </div>
  );
}

export default Index;
