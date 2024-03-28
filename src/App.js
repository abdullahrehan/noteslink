import React, { useRef,useContext} from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Components/Main/Header/index.js";
import Sidabar from "./Components/Main/Sidebar/index.js";

import Home from "./Pages/Home/index.js";
import SavedFiles from "./Pages/SavedFiles/index.js";
import PublicFiles from "./Pages/PublicFiles/index.js";
import SeachFiles from "./Pages/SeachFiles/index.js";
import DeleteFiles from "./Pages/DeleteFiles/index.js";

import EnterEmail from './Pages/Authentication/ForgotPassword/EnterEmail'
import AuthPages from './Pages/Authentication/AuthPages/index'
import VerificationCode from './Pages/Authentication/ForgotPassword/VerificationCode'
import UpdatePassword from './Pages/Authentication/ForgotPassword/UpdatePassword'
import PasswordChanges from './Pages/Authentication/ForgotPassword/PasswordChanges.jsx'

import AuthenticationPage from './Pages/Authentication/Index.js'
// import Complaints from "./Pages/Complaints/index.js";

import Storage from "./Pages/Storage/index.js";
import NotFound from "./Pages/NotFound/index.js";
import ServiceCenter from "./Pages/ServiceCenter/index.js";

import Settings from "./Pages/Settings/index.js";
import Feedback from "./Pages/Feedback/index.js";
import Help from "./Pages/Help/index.js";
import AppContext from './Context_Api/AppContext.js'

import "./App.css";

// import { collection, getDocs } from "firebase/firestore";
// import { fdb, rdb } from "./Firebase/firebaseConfig.js";
// import { ref, onValue, push, update, remove } from "firebase/database";


// import {AppContextProvider} from './Context_Api/AppContext.js';
// import Reducer from './Context_Api/Reducer/index.js'
// import InitialState from './Context_Api/Initial_State/index.js'

const App = () => {
  // const fetchData = async () => {
  //   const querySnapshot = await getDocs(collection(fdb, "users"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });

  //   const data = await push(ref(rdb, '/todos'), {
  //     done: false,
  //     title: "rt",
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  //asdasdadasdasasdadasdasds
  //asdad
  // }, []);

  const {state,dispatch}=useContext(AppContext)
  const {openSideBar}=state
//console
  
  const menuref = useRef();

  const MenuButton = () => {
    dispatch({ type: 'setSideBar', sideBar:!openSideBar});

    if (openSideBar) {
      menuref.current.style.width = "60px";
      dispatch({ type: 'setFolderPath', folderPath: true });
    } else {
      menuref.current.style.width = "180px";
      dispatch({ type: 'setFolderPath', folderPath: false });
    }
    }

  return (

<div className="bg-red-00 w-full h-[100vh] selection:bg-red-300 select-none">

      <div className="w-full h-[65px]">

        <Header menuButton={MenuButton} />

      </div>

      <div className="w-full minus-65px bg-red-000 flex ">
        
        <div className={`w-[60px] h-[90vh] t-[10vh] transition-all delay-70 duration-400 ease-in-out bg-[#2D2D2D] rounded-r-lg `} ref={menuref} >
         
          <Sidabar openMenu={openSideBar} />
        
        </div>

        <div className="h-full w-full w-minus-60px flex justify-end items-end">
    
          <Routes>
    
            <Route path="/auth"  element={<AuthenticationPage><AuthPages/></AuthenticationPage>} />
            <Route path="/email" element={<AuthenticationPage><EnterEmail/></AuthenticationPage>} />
            <Route path="/verificationcode" element={<AuthenticationPage><VerificationCode/></AuthenticationPage>} />
            <Route path="/updatepassword" element={<AuthenticationPage><UpdatePassword/></AuthenticationPage>} />
            <Route path="/passwordchanged" element={<AuthenticationPage><PasswordChanges/></AuthenticationPage>} />

            
            <Route path="/noteslink/" element={<Home />} />
            <Route path="/savedfiles" element={<SavedFiles />} />
            <Route path="/publicfiles" element={<PublicFiles />} />
            <Route path="/seachfiles" element={<SeachFiles />} />

            <Route path="/deletefiles" element={<DeleteFiles />} />
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
