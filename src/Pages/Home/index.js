import React, { useState } from "react";

function Index() {
  console.log("home");
  const [closeFolderPath,setCloseFolderPath] = useState(false)
  return (
    <div className="w-full h-full bg-green-200 flex justify-end  font-medium text-4xl">
      {/* <h4>Home</h4> */}

      <div className={`${closeFolderPath ? "w-full" :"w-minus-250px"} h-full bg-red-300 transition-all delay-70 duration-400 ease-in-out`}>
        <div className="w-full h-[50px] bg-green-300"></div>
        <div className="w-full h-minus-110px bg-green-400 center" onClick={()=>setCloseFolderPath(!closeFolderPath)}>click</div>
        <div className="w-full h-[60px] bg-green-500"></div>
      </div>

      <div className={`${ closeFolderPath ?  "w-[10px]":"w-[250px]" } transition-all delay-70 duration-400 ease-in-out h-full bg-red-400`} >

      </div>
    </div>
  );
}

export default Index;
