import React, { useRef,useContext, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb, rdb } from "./Firebase/firebaseConfig.js";

import Header from "./Components/Main/Header/index.js";
import Sidabar from "./Components/Main/Sidebar/index.js";
import AdminSidebar from "./Components/Main/Sidebar/AdminSidebar.jsx";
import LogOut from "./Components/Main/Header/LogOut.jsx";

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
import HomeReRoute from "./Pages/HomeReRoute/HomeReRoute.jsx";
import ServiceCenter from "./Pages/ServiceCenter/index.js";

import AllUsers from "./Pages/Admin/AllUsers.jsx";
import Complaints from "./Pages/Admin/Complaints.jsx";
import Report from "./Pages/Admin/Report.jsx";
import Feedback from "./Pages/Admin/Feedback.jsx";


import Settings from "./Pages/Settings/index.js";
// import Feedback from "./Pages/Feedback/index.js";
import Help from "./Pages/Help/index.js";
import AppContext from './Context_Api/AppContext.js'
import "./App.css";
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from "react-router-dom";


const App = () => {


  const {state,dispatch}=useContext(AppContext)
  const {openSideBar,logoutPopup}=state
  const navigate = useNavigate();

  
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

    // console.log(Cookies.get("isAdmin"))

    const getUserData=async()=>{

      await getDocs(
        query(
          collection(fdb, "users"),
          where("emailAddress", "==",Cookies.get("userEmail").slice(1,-1))
        )
      )
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {name,emailAddress}=doc.data();
            
            dispatch({ type: "setName", Name: name });
            dispatch({ type: "setEmail", Email: emailAddress });
  
          });
        })
    }

    

    useEffect(()=>{

      
      if(Cookies.get("userEmail")){
        getUserData()
        dispatch({ type: "setRefreshData", refreshDataAction: true });
      }

      if(Cookies.get("isAdmin")==="true"){
        dispatch({ type: "setIsAdmin", isAdminAction: true });
      }
      else{
        dispatch({ type: "setIsAdmin", isAdminAction: false });

      }

    },[])

    console.log(state.isAdmin)


  return (

<div className="bg-red-00 w-full h-[100vh] selection:bg-red-300 select-none">

      <div className="w-full h-[65px]">

        <Header heading={state.isAdmin ? "NotesLink - Dashboard":"NotesLink"} menuButton={MenuButton} />

      </div>

      <div className="w-full minus-65px bg-red-000 flex ">
        
        <div className={`w-[60px] h-[90vh] t-[10vh] transition-all delay-70 duration-400 ease-in-out bg-[#2D2D2D] rounded-r-lg `} ref={menuref} >
         
          {state.isAdmin ?
          <AdminSidebar openMenu={openSideBar} />
:          
            <Sidabar openMenu={openSideBar} /> 
            }
           </div>

        {logoutPopup ? (
          <LogOut
       
          />
        ) : null}

        <div className="h-full w-full w-minus-60px flex justify-end items-end">
    
          <Routes>
    
          <Route path="/"  element={<HomeReRoute/>} />


          {state.isAdmin ?
            <>
            <Route path="/admin"  element={<AllUsers/>} />
            <Route path="/report"  element={<Report/>} />
            <Route path="/feedback"  element={<Feedback/>} />
            </>
          :
          null
          }  
            <Route path="/auth"  element={<AuthenticationPage><AuthPages/></AuthenticationPage>} />
            <Route path="/email" element={<AuthenticationPage><EnterEmail/></AuthenticationPage>} />
            <Route path="/verificationcode" element={<AuthenticationPage><VerificationCode/></AuthenticationPage>} />
            <Route path="/updatepassword" element={<AuthenticationPage><UpdatePassword/></AuthenticationPage>} />
            <Route path="/passwordchanged" element={<AuthenticationPage><PasswordChanges/></AuthenticationPage>} />

            
          {!state.isAdmin ?
          <>  <Route path="/noteslink/" element={<Home />} />
            <Route path="/savedfiles" element={<SavedFiles />} />
            <Route path="/publicfiles" element={<PublicFiles />} />
            <Route path="/seachfiles" element={<SeachFiles />} />

            <Route path="/deletefiles" element={<DeleteFiles />} />
            <Route path="/service-center" element={<ServiceCenter />} />
            <Route path="/storage" element={<Storage />} />

            <Route path="/account-setting" element={<Settings />} />
            <Route path="/send-feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />
            </>
          :null}
            <Route path="*" element={<NotFound />} />
    
          </Routes>

        </div>

      </div>

    </div>
        
    );
};

export default App;
