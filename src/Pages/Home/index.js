 import React, { useEffect, useRef, useState ,useContext } from "react";
import AllTabs from "./Components/AllTabs";
import NavigationFolder from "./Components/NavigationFolder";
import TabFolderIcon from "../../Assets/Images/tabFolderIcon.png";
import FolderPath from "./Components/FolderPath";
import AddFilesButton from "./Components/AddFilesButton";
import AllFiles from "../../Components/Others/Files/index.js";
import PageSettings from './Components/PageSettings.jsx'
import {HomeFiles} from '../../Apis/Api.js'
import LogOut from '../../Components/Main/Header/LogOut.jsx'
import NewFolder from './Components/NewFolder.jsx'
import RenameFile from './Components/RenameFile.jsx'
import NewFile from './Components/NewFile.jsx'
import DeleteFile from '../../Components/Others/DeleteFile.jsx'
import SaveFile from '../../Components/Others/SaveFile.jsx'
import AppContext from '../../Context_Api/AppContext.js'

function Index() {

  const {state,dispatch}=useContext(AppContext)
  const {logoutPopup,newFolderNamePopup,renameFilePopup,renameFolderPopup,deletFilePopup,addNewTextfile,saveFilePopup}=state
  const [offsetHeightHome,setOffsetHeightHome]=useState(null);
  const [offsetWidthHome,setOffsetWidthHome]=useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuDimension,setMenuDimension]=useState({horizontal:"right",vertical:"bottom"})

  const {openFoldersPath,openHomeSetings,openFileSettings}=state
  // const [setLoader,]

  const homeSettingsRef=useRef()
  const homeRef=useRef()
  const homeFilesSettingRef = useRef([])

  useEffect(()=>{

    if(homeRef.current!==undefined){

    const { offsetWidth, offsetHeight } = homeRef.current;
    setOffsetHeightHome(offsetHeight);
    setOffsetWidthHome(offsetWidth);
  }

  },[])

 
  const HorizontalRange=
  {
    
    leftTop:{
      top:0,
      bottom:offsetHeightHome/2,
      left:0,
      right:offsetWidthHome/2
    },

    leftBottom:{
      top:(offsetHeightHome/2)+1,
      bottom:offsetHeightHome,
      left:0,
      right:offsetWidthHome/2
    },
    
    rightTop:{
      top:0,
      bottom:offsetHeightHome/2,
      left:(offsetWidthHome/2)+1,
      right:offsetWidthHome
    },

    rightBottom:{
      top:(offsetHeightHome/2)+1,
      bottom:offsetHeightHome,
      left:(offsetWidthHome/2)+1,
      right:offsetWidthHome
    },
  }

  const closePopUp=()=>{
    dispatch({ type: 'setOpenAccountSettings', openAccountSettingsAction:false})
    dispatch({ type: 'setOpenNotifications', openNotificationsAction:false})
    dispatch({ type: 'setOpenHomeSetings', openHomeSetingsAction:false})

  }
  const checkPosition=()=>{
  
    if(cursorPosition.x >= HorizontalRange.leftTop.left &&  cursorPosition.x <= HorizontalRange.leftTop.right){
      if(cursorPosition.y >= HorizontalRange.leftTop.top &&  cursorPosition.y <= HorizontalRange.leftTop.bottom){ setMenuDimension({horizontal:"right",vertical:"bottom"})}
      else if(cursorPosition.y >= HorizontalRange.leftBottom.top &&  cursorPosition.y <= HorizontalRange.leftBottom.bottom){ setMenuDimension({horizontal:"right",vertical:"top"})}
    }

    else if(cursorPosition.x >= HorizontalRange.rightTop.left &&  cursorPosition.x <= HorizontalRange.rightTop.right){      
      if(cursorPosition.y >= HorizontalRange.rightTop.top &&  cursorPosition.y <= HorizontalRange.rightTop.bottom){ setMenuDimension({horizontal:"left",vertical:"bottom"})}
      else if(cursorPosition.y >= HorizontalRange.rightBottom.top &&  cursorPosition.y <= HorizontalRange.rightBottom.bottom){ setMenuDimension({horizontal:"left",vertical:"top"})}
    }

  }
  

  const handleWindowMouseMove = event => {

    dispatch({ type: 'setOpenHomeSetings', openHomeSetingsAction:false})

    event.preventDefault();
  
    dispatch({ type: 'setOpenHomeSetings', openHomeSetingsAction:true})

    homeSettingsRef.current.style.left=`${cursorPosition.x-210}px`;

    if(offsetHeightHome-cursorPosition.y<243){ homeSettingsRef.current.style.top = ''; homeSettingsRef.current.style.bottom=`2px`; }

    else{ homeSettingsRef.current.style.top=`${cursorPosition.y}px` }
};

  const handleMouseMove = (e) => {

    const target = e.target;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if(!openHomeSetings){
  
      setCursorPosition({ x: x, y: y });
      checkPosition()
    } 

  };

  const closeFileSettings=()=>{
    if(homeFilesSettingRef.current[openFileSettings?.index]!==undefined){
    homeFilesSettingRef.current[openFileSettings?.index].style.display="none"}
    dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: false, event: null, index: null }})
  }

  
  useEffect(()=>{
    closeFileSettings()

  },[renameFilePopup,renameFolderPopup,deletFilePopup])


  return (
  
  <div className="w-full h-full bg-green-00 flex justify-end  text-4xl" onClick={closeFileSettings}>
      
      <div className={`${ openFoldersPath ? "w-minus-220px" : "w-full" } h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out`}>
      
        <div className="w-full h-[35px] bg-green-00 flex items-center ">
      
          <AllTabs />

          <div className="w-[40px] h-full hover:cursor-pointer rounded-full bg-#0002] center">
      
            <img src={TabFolderIcon} className="h-[18px] hover:h-[19px]" onClick={() =>dispatch({ type: 'setFolderPath', folderPath:true})} />
      
          </div>
      
        </div>
      
        <div className="w-full h-[45px]">
      
          <FolderPath />
      
        </div>
      
        <div className="w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative"  onContextMenu={handleWindowMouseMove} ref={homeRef} onMouseMove={handleMouseMove} onClick={closePopUp}>
      
          <AllFiles data={HomeFiles} homeFilesSettingRef={homeFilesSettingRef}/>
      
          <div className={`absolute ${ openHomeSetings ? "flex" : "hidden" }`} ref={homeSettingsRef}>
          
            <PageSettings menuDimension={menuDimension}/>
          
          </div>
      
        </div>

        

    {logoutPopup ? <LogOut Function={() =>dispatch({ type: 'setLogoutPopup', logoutPopupAction:false})}/> : null }
    {newFolderNamePopup ? <NewFolder/> : null }
    {renameFilePopup ? <RenameFile type="File" Function={() =>dispatch({ type: 'setRenameFilePopup', renameFilePopupAction:false})}/> : null }
    {renameFolderPopup ? <RenameFile type="Folder" Function={() =>dispatch({ type: 'setRenameFolderPopup', renameFolderPopupAction:false})}/> : null }
    {deletFilePopup ? <DeleteFile type="File" Function={() =>dispatch({ type: 'setDeletFilePopup', deletFilePopupAction:false})}/> : null }
    {saveFilePopup ? <SaveFile type="File" Function={() =>dispatch({ type: 'setSaveFilePopup', saveFilePopupAction:false})}/> : null }
    {addNewTextfile?<NewFile/>:null}

    
      
        <div className="w-full h-[70px] flex bg-green-00 relative justify-between items-end px-2 pb-2">
      
          <div className="flex gap-2 text-sm font-medium ">

            <span>5 Folders </span>
      
            <span>Size 1.5Gb</span>
      
          </div>

      
          <div className="absolute bottom-2 right-2">
      
            <AddFilesButton />
      
          </div>
      
        </div>
      
      </div>

      <div className={`${ openFoldersPath ? "w-[220px]" : "w-[0px]" } transition-all delay-70 duration-400 ease-in-out h-full ${ openFoldersPath ?  "border-l-[1.5px] border-[#B3B3B3]" : null } `} >
 
        <NavigationFolder closeFolders={() =>dispatch({ type: 'setFolderPath', folderPath:false})} />
      
      </div>

    
    </div>
  
  );
}

export default Index;
