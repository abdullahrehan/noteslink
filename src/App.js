import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Increment, Decrement } from "./Redux/Actions/index.js";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Main/Header/index.js";
import Sidabar from "./Components/Main/Sidebar/index.js";

import Home from "./Pages/Home/index.js";
import SavedFiles from "./Pages/SavedFiles/index.js";
import PublicFiles from "./Pages/PublicFiles/index.js";
import SeachFiles from "./Pages/SeachFiles/index.js";
import DeleteFiles from "./Pages/DeleteFiles/index.js";
// import Complaints from "./Pages/Complaints/index.js";

import Storage from "./Pages/Storage/index.js";
import NotFound from "./Pages/NotFound/index.js";
import ServiceCenter from "./Pages/ServiceCenter/index.js";

import Settings from "./Pages/Settings/index.js";
import Feedback from "./Pages/Feedback/index.js";
import Help from "./Pages/Help/index.js";

import "./App.css";

const App = () => {
  const myState = useSelector((state) => state.IncrementDecrement);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuref = useRef();

  const menuButton = () => {
    setOpenMenu(!openMenu);
    openMenu ? (menuref.current.style.width = "60px") : (menuref.current.style.width = "180px") ;
  };

  return (
    <div className="bg-red-00 w-full h-[100vh] selection:bg-red-300 select-none">
      
      <div className="w-full h-[65px]">
      
        <Header menuButton={menuButton} setOpenMenu={() => setOpenMenu(!openMenu)} />
      
      </div>

      <div className="w-full minus-65px bg-red-000 flex ">

        <div className={`w-[60px] h-[90vh]  t-[10vh] transition-all delay-70 duration-400 ease-in-out bg-[#2D2D2D] rounded-r-lg `} ref={menuref} >

          <Sidabar openMenu={openMenu} />

        </div>

        <div className="h-full w-full w-minus-60px">

          <Routes>
        
            <Route path="/" element={<Home />} />
            <Route path="/savedfiles" element={<SavedFiles />} />
            <Route path="/publicfiles" element={<PublicFiles />} />
            <Route path="/seachfiles" element={<SeachFiles />} />
            
            <Route path="/deletefiles" element={<DeleteFiles />} />
            {/* <Route path="/complaints" element={<Complaints />} /> */}
            <Route path="/service-center" element={<ServiceCenter />} />
            <Route path="/storage" element={<Storage />} />

            <Route path="/account-setting" element={<Settings />} />
            <Route path="/send-feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />

            <Route element={<NotFound />} />
        
          </Routes>

        </div>
      
      </div>
    
    </div>
  
  );
};

export default App;
