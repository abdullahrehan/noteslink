import React, { useState } from "react";
import AllTabs from './Components/AllTabs'
function Index() {

  const [closeFolderPath,setCloseFolderPath] = useState(false)
  return (
    <div className="w-full h-full bg-green-00 flex justify-end  text-4xl">

      <div className={`${closeFolderPath ? "w-full" :"w-minus-250px"} h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out`}>
        <div className="w-full h-[35px] bg-green-00 "><AllTabs/></div>
        <div className="w-full h-minus-110px bg-green-00 center" onClick={()=>setCloseFolderPath(!closeFolderPath)}>Home</div>
        <div className="w-full h-[70px] bg-green-00"></div>
      </div>

      <div className={`${ closeFolderPath ?  "w-[10px]":"w-[250px]" } transition-all delay-70 duration-400 ease-in-out h-full bg-red-400`} >

      </div>
    </div>
  );
}

export default Index;
