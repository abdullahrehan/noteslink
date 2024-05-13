import React, { useEffect, useRef, useState, useContext } from "react";
import NavigationFolder from "../../Components/Others/NavigationFolder.jsx";
import NavigationFolderPath from "./Components/Loaders/NavigationFolderPath.jsx";
import TabFolderIcon from "../../Assets/Images/tabFolderIcon.png";
import FolderPath from "../../Components/Others/FolderPath.jsx";
import FolderPathLoader from "./Components/Loaders/FolderPathLoader.jsx";
import AddFilesButton from "./Components/AddFilesButton";
import AllFiles from "../../Components/Others/Files/index.js";
import PageSettings from "./Components/PageSettings.jsx";
import AllTabs from "./Components/AllTabs";
import NewFolder from "./Components/NewFolder.jsx";
import RenameFile from "./Components/RenameFile.jsx";
import NewFile from "./Components/NewFile.jsx";
import OpenedFile from "./Components/OpenedFile.jsx";
import DeleteFile from "../../Components/Others/DeleteFile.jsx";
import SaveFile from "../../Components/Others/SaveFile.jsx";
import AppContext from "../../Context_Api/AppContext.js";
import NotesVector from '../../Assets/Images/Notes.gif'
import Cookies from 'js-cookie';

import {  useNavigate, useParams } from "react-router-dom";
import UserFeedback from '../UserFeedback/UserFeedback.jsx'


function Index({getFilesData,data}) {
  
  const { state, dispatch } = useContext(AppContext);
  const {refreshData,newFolderNamePopup,renameFilePopup,renameFolderPopup,deletFilePopup,addNewTextfile,saveFilePopup,fileViewerContent,openFoldersPath, openHomeSetings, openFileSettings} = state;
  // const [data, setData] = useState([]);

  const {id}=useParams();
    
  const [offsetHeightHome, setOffsetHeightHome] = useState(null);
  const [offsetWidthHome, setOffsetWidthHome] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuDimension, setMenuDimension] = useState({horizontal: "right",vertical: "bottom"});

  const [loading, setLoading] = useState(false);
  const [loadFolders, setloadFolders] = useState(false);
  const [tabsLoading, setTabsLoading] = useState(true);
  const [searchFolder, setSearchFolder] = useState("");

  const homeSettingsRef = useRef();
  const homeRef = useRef();
  const homeFilesSettingRef = useRef([]);
  const navigate = useNavigate();
  
  
  const HorizontalRange = {
    leftTop: {
      top: 0,
      bottom: offsetHeightHome / 2,
      left: 0,
      right: offsetWidthHome / 2,
    },

    leftBottom: {
      top: offsetHeightHome / 2 + 1,
      bottom: offsetHeightHome,
      left: 0,
      right: offsetWidthHome / 2,
    },

    rightTop: {
      top: 0,
      bottom: offsetHeightHome / 2,
      left: offsetWidthHome / 2 + 1,
      right: offsetWidthHome,
    },

    rightBottom: {
      top: offsetHeightHome / 2 + 1,
      bottom: offsetHeightHome,
      left: offsetWidthHome / 2 + 1,
      right: offsetWidthHome,
    },
  };


  const getData = async () => {

    // await getDocs(query( collection(fdb, "files"), where("owner", "==", Cookies.get("userEmail").slice(1,-1).split('@')[0].trim().toLowerCase()),where("parent", "==", state.homeCurrentFoler.name=="My Computer"?"":state.homeFolderPath[state.homeFolderPath.length-1])))
    // .then((querySnapshot) => { setData([]); querySnapshot.forEach((doc) => { setData((prev) => [...prev, doc.data()])})})
    getFilesData().then(()=>{setLoading(false);setloadFolders(false)})
    .catch((e) => console.log(e));
  
  };

  const closePopUp = () => {

    dispatch({type: "setOpenAccountSettings",openAccountSettingsAction: false});
    dispatch({ type: "setOpenNotifications", openNotificationsAction: false });
    dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });
  
  };

  const checkPosition = () => {
    if (cursorPosition.x >= HorizontalRange.leftTop.left && cursorPosition.x <= HorizontalRange.leftTop.right) {

      if(cursorPosition.y >= HorizontalRange.leftTop.top && cursorPosition.y <= HorizontalRange.leftTop.bottom) { setMenuDimension({ horizontal: "right", vertical: "bottom" })} 
      else if(cursorPosition.y >= HorizontalRange.leftBottom.top && cursorPosition.y <= HorizontalRange.leftBottom.bottom){setMenuDimension({ horizontal: "right", vertical: "top" })}} 
      else if(cursorPosition.x >= HorizontalRange.rightTop.left && cursorPosition.x <= HorizontalRange.rightTop.right) {
      if(cursorPosition.y >= HorizontalRange.rightTop.top && cursorPosition.y <= HorizontalRange.rightTop.bottom){ setMenuDimension({ horizontal: "left", vertical: "bottom" })}
      else if (cursorPosition.y >= HorizontalRange.rightBottom.top && cursorPosition.y <= HorizontalRange.rightBottom.bottom){setMenuDimension({ horizontal: "left", vertical: "top" })}
    }
  };

  const handleWindowMouseMove = (event) => {
    
    dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });
    event.preventDefault();
    dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: true });
    homeSettingsRef.current.style.left = `${cursorPosition.x - 210}px`;

    if (offsetHeightHome - cursorPosition.y < 243) {
      homeSettingsRef.current.style.top = "";
      homeSettingsRef.current.style.bottom = `2px`;
    } else {
      homeSettingsRef.current.style.top = `${cursorPosition.y}px`;
    }
  };

  const handleMouseMove = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!openHomeSetings) {
      setCursorPosition({ x: x, y: y });
      checkPosition();
    }
  };

  const closeFileSettings = () => {
  
    if (homeFilesSettingRef.current[openFileSettings?.index] !== undefined) {
      homeFilesSettingRef.current[openFileSettings?.index].style.display ="none"
    }
    dispatch({type: "setOpenFileSettings",openFileSettingsAction: { value: false, event: null, index: null }});
  
  };
  
  const searchFolders=(data, searchQuery)=> {
    
    if(searchQuery!==""){
      
      const query = searchQuery.toLowerCase();
      
      const filteredFolders = data.filter(folderName => {
        const folderNameLower = folderName.name.toLowerCase();
        return folderNameLower.includes(query);
      });

      return filteredFolders;
    }

    else{ return data }
  
  }

  
  useEffect(()=>{

    if(!Cookies.get("userEmail")){ navigate("/auth")}

    if (homeRef.current !== undefined) {
      const { offsetWidth, offsetHeight } = homeRef.current;
      setOffsetHeightHome(offsetHeight);
      setOffsetWidthHome(offsetWidth);
    }

  },[])

 
  // useEffect(() => { if(refreshData){ getData(); dispatch({ type: "setRefreshData", refreshDataAction: false })} } , [refreshData]);

  // useEffect(()=>{ if(data.length>0){ dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: {name:"My Computer",data:data} }) } },[data])

  useEffect(() => { closeFileSettings() }, [fileViewerContent,renameFilePopup, renameFolderPopup, deletFilePopup]);


  return (

    <div className="w-full h-full bg-green-00 flex justify-end  text-4xl" onClick={closeFileSettings} onLoad={()=> dispatch({ type: "setRefreshData", refreshDataAction: true })}>
      
      <div className={`${ openFoldersPath ? "w-minus-220px" : "w-full"} h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out `}>
        
        <div className={`w-full h-[35px] bg-green-00 flex items-center`}>
        
          <AllTabs loading={loading} tabsLoading={tabsLoading} setTabsLoading={(value)=>setTabsLoading(value)} setLoading={(value)=>setloadFolders(value)} />

          <div className="w-[40px] h-full hover:cursor-pointer rounded-full bg-#0002] center">
        
            <img src={TabFolderIcon} className="h-[18px] hover:h-[19px]" onClick={() =>dispatch({ type: "setFolderPath", folderPath: true })}/>
        
          </div>
        
        </div>

        <div className={`w-full h-[45px] `}>
      
          {loading ? <FolderPathLoader /> :  <FolderPath searchFolder={searchFolder} setSearchFolder={(value)=>setSearchFolder(value)} folderdata={data} /> }
      
        </div>


        <div className={`w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative flex`} onContextMenu={handleWindowMouseMove} ref={homeRef} onMouseMove={handleMouseMove} onClick={closePopUp} >
          
          <AllFiles data={searchFolders(state.homeCurrentFoler.data,searchFolder)} homeFilesSettingRef={homeFilesSettingRef} loading={loadFolders} page={"home"}/>

          <div className={`absolute ${openHomeSetings ? "flex" : "hidden"}`} ref={homeSettingsRef}>
          
            <PageSettings menuDimension={menuDimension} />
          
          </div>

        </div>

        
        {newFolderNamePopup ? <NewFolder userData={data} /> : null}
        
        {renameFilePopup.value ? <RenameFile type="File" Function={() => dispatch({type: "setRenameFilePopup",renameFilePopupAction: false})}/>: null}
       
        {renameFolderPopup.value ? <RenameFile type="Folder" Function={() => dispatch({ type: "setRenameFolderPopup",renameFolderPopupAction: {value:false,id:null}, })}/> : null}
       
        {deletFilePopup ? <DeleteFile type="File" Function={() => dispatch({ type: "setDeletFilePopup", deletFilePopupAction: false,})}/>: null}

        {saveFilePopup ? <SaveFile type="File" Function={() => dispatch({ type: "setSaveFilePopup", saveFilePopupAction: false })}/> : null}
      
        {addNewTextfile ? <NewFile /> : null}
      


        <div className="w-full h-[70px] flex bg-green-00 relative justify-between items-end px-2 pb-2">
        
          {loading ? 

            <div className="flex gap-2 text-sm font-medium ">

              <div className="bg-slate-400 animate-pulse w-[80px] h-[15px] rounded-full "></div>
              <div className="bg-slate-400 animate-pulse w-[80px] h-[15px] rounded-full "></div>

            </div>
          
          : 

          <div className={`flex gap-2 text-sm font-medium ${data.length==0?"hidden":"flex"}` }>

              <div>{state.homeCurrentFoler.data.length} Files </div>

            </div>

          }

          <div className="absolute bottom-2 right-2"> <AddFilesButton /> </div>

        </div>

      </div>

      <div className={`${ openFoldersPath ? "w-[220px]" : "w-[0px]" } transition-all delay-70 duration-400 ease-in-out h-full ${ openFoldersPath ? "border-l-[1.5px] border-[#B3B3B3]" : null} `}>

        { loading ? <NavigationFolderPath /> :  <NavigationFolder folderName={"Main Files"} closeFolders={() => dispatch({ type: "setFolderPath", folderPath: false })} /> }

      </div>

      {state.showFeedbackForm ? <UserFeedback/> :null}

    </div>
  );
}

export default Index;
