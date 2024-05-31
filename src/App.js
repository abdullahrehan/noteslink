import React, { useRef, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { doc,getDoc} from "firebase/firestore";
import { fdb } from "./Firebase/firebaseConfig.js";
import { collection, getDocs, query, where } from "firebase/firestore";

import EnterEmail from "./Pages/Authentication/ForgotPassword/EnterEmail";
import AuthPages from "./Pages/Authentication/AuthPages/index";
import VerificationCode from "./Pages/Authentication/ForgotPassword/VerificationCode";
import UpdatePassword from "./Pages/Authentication/ForgotPassword/UpdatePassword";
import PasswordChanges from "./Pages/Authentication/ForgotPassword/PasswordChanges.jsx";
import AuthenticationPage from "./Pages/Authentication/Index.js";

import Header from "./Components/Main/Header/index.js";
import Sidabar from "./Components/Main/Sidebar/index.js";
import AdminSidebar from "./Components/Main/Sidebar/AdminSidebar.jsx";
import LogOut from "./Components/Main/Header/LogOut.jsx";

import Home from "./Pages/Home/index.js";
import SavedFiles from "./Pages/SavedFiles/index.js";
import PublicFiles from "./Pages/PublicFiles/index.js";
import SeachFiles from "./Pages/SeachFiles/index.js";
import DeleteFiles from "./Pages/DeleteFiles/index.js";
import SharedFiles from "./Pages/SharedFiles/index.js";
import OpenedFile from "./Pages/Home/Components/OpenedFile.jsx";
import OpenedSearchFile from "./Pages/Home/Components/OpenedSearchFile.jsx";

import Help from "./Pages/Help/index.js";
import Settings from "./Pages/Settings/index.js";
import UserFeedback from "./Pages/UserFeedback/UserFeedback.jsx";
import NotFound from "./Pages/NotFound/index.js";
import HomeReRoute from "./Pages/HomeReRoute/HomeReRoute.jsx";

import AllUsers from "./Pages/Admin/AllUsers.jsx";
import Report from "./Pages/Admin/Report.jsx";
import Feedback from "./Pages/Admin/Feedback.jsx";

import AppContext from "./Context_Api/AppContext.js";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {

  const { state, dispatch } = useContext(AppContext);
  const { openSideBar, logoutPopup ,fileViewerContent ,searchFileViewerContent ,refreshData } = state; 
  const [data, setData] = useState([]);
  const menuref = useRef();

  const MenuButton = () => {

    dispatch({ type: "setSideBar", sideBar: !openSideBar });

    if (openSideBar) {
      menuref.current.style.width = "60px";
      dispatch({ type: "setFolderPath", folderPath: true });
    } else {
      menuref.current.style.width = "180px";
      dispatch({ type: "setFolderPath", folderPath: false });
    }
  };


  const getUserData = async () => {

    try {
     
      const data = await getDoc(doc(fdb, "users", localStorage.getItem('userEmail')));
      const { name, emailAddress, picture } = data.data();

      dispatch({ type: "setProfilePic", profilePicAction: picture });

      dispatch({ type: "setName", Name: name });
      dispatch({ type: "setEmail", Email: emailAddress });
    
    } catch (error) {console.error(error)}
 
  };

  const getFilesData=async()=>{

    await getDocs(query( collection(fdb, "files"), where("owner", "==", Cookies.get("userEmail").slice(1,-1).split('@')[0].trim().toLowerCase()),where("parent", "==", state.homeCurrentFoler.name=="My Computer"?"":state.homeFolderPath[state.homeFolderPath.length-1])))
    .then((querySnapshot) => { setData([]); querySnapshot.forEach((doc) => { setData((prev) => [...prev, doc.data()])})})
  

  }
  // console.log(state.profilePic)


  useEffect(() => { if(refreshData){ getFilesData(); dispatch({ type: "setRefreshData", refreshDataAction: false })} } , [refreshData]);

  useEffect(()=>{ if(data.length>0){ dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: {name:"My Computer",data:data} }) } },[data])


  useEffect(() => {
    if (Cookies.get("userEmail")) {
      getUserData()
      .then(()=>getFilesData())
      dispatch({ type: "setRefreshData", refreshDataAction: true });
    }

    if (Cookies.get("isAdmin") === "true") {
      dispatch({ type: "setIsAdmin", isAdminAction: true });
    } else {
      dispatch({ type: "setIsAdmin", isAdminAction: false });
    }
  }, []);
  

  return (
    <div className="bg-red-00 w-full h-[100vh] selection:bg-red-300 select-none">
      
      <div className="w-full h-[65px]">

        <Header heading={state.isAdmin ? "NotesLink - Dashboard" : "NotesLink"} menuButton={MenuButton}/>
      
      </div>

      <div className="w-full minus-65px bg-red-000 flex ">

        <div className={`w-[60px] h-[90vh] t-[10vh] transition-all delay-70 duration-400 ease-in-out bg-[#2D2D2D] rounded-r-lg `} ref={menuref}>
      
          {state.isAdmin ? ( <AdminSidebar openMenu={openSideBar} /> ) : ( <Sidabar openMenu={openSideBar} /> )}

        </div>

        {logoutPopup ? <LogOut /> : null}
        {fileViewerContent.value ? <OpenedFile /> : null}
        {searchFileViewerContent.value ? <OpenedSearchFile /> : null}


        <div className="h-full w-full w-minus-60px flex justify-end items-end">
        
          <Routes>
        
            <Route path="/" element={<HomeReRoute />} />
           
            <Route path="/auth" element={<AuthenticationPage><AuthPages /></AuthenticationPage>}/>
            <Route path="/email" element={<AuthenticationPage><EnterEmail /></AuthenticationPage>}/>
            <Route path="/verificationcode" element={<AuthenticationPage><VerificationCode/></AuthenticationPage>}/>
            <Route path="/updatepassword" element={<AuthenticationPage><UpdatePassword /></AuthenticationPage>}/>
            <Route path="/passwordchanged" element={<AuthenticationPage><PasswordChanges /></AuthenticationPage>}/>

            {state.isAdmin ?
            
            <>
              <Route path="/admin" element={<AllUsers />} />
              <Route path="/report" element={<Report />} />
              <Route path="/feedback" element={<Feedback />} />
             </>
           
           :
            
            !state.isAdmin ? (
            
            <>
                <Route path="/noteslink/:folderID" element={<Home getFilesData={getFilesData} data={data}/>} />
                <Route path="/noteslink" element={<Home getFilesData={getFilesData} data={data}/>} />
                <Route path="/savedfiles" element={<SavedFiles />} />
                <Route path="/publicfiles" element={<PublicFiles getFilesData={getFilesData} data={data}/>} />
                <Route path="/seachfiles" element={<SeachFiles />} />
                <Route path="/sharedFiles" element={<SharedFiles />} />
                <Route path="/deletefiles" element={<DeleteFiles />} />
                {/* <Route path="/account-setting" element={<Settings />} /> */}
                <Route path="/send-feedback" element={<UserFeedback />} />
                <Route path="/help" element={<Help />} />
          
            </>
            
            ) : null}

            <Route path="*" element={<NotFound />} />
          
          </Routes>

        </div>

      </div>

    </div>
  );
};

export default App;
