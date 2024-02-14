import React, { useState } from "react";
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
import Complaints from "./Pages/Complaints/index.js";
import Storage from "./Pages/Storage/index.js";
import NotFound from "./Pages/NotFound/index.js";

import "./App.css"

const App = () => {
  const myState = useSelector((state) => state.IncrementDecrement);
  const dispatch = useDispatch();
  const [openMenu,setOpenMenu]=useState(false)
  return (
    <div className="bg-red-00 w-full h-[100vh]">
      <div className="w-full h-[65px]">
        <Header setOpenMenu={()=>setOpenMenu(!openMenu)}/>
      </div>
      <div className={` ${ openMenu ? "w-[180px]" : "w-[60px]" } h-[90vh] absolute t-[10vh] `}>
        <Sidabar openMenu={openMenu} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/savedfiles" element={<SavedFiles />} />
        <Route path="/publicfiles" element={<PublicFiles />} />
        <Route path="/seachfiles" element={<SeachFiles />} />
        <Route path="/deletefiles" element={<DeleteFiles />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/storage" element={<Storage />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
