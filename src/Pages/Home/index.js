 import React, { useEffect, useRef, useState ,useContext } from "react";
import AllTabs from "./Components/AllTabs";
import NavigationFolder from "./Components/NavigationFolder";
import TabFolderIcon from "../../Assets/Images/tabFolderIcon.png";
import FolderPath from "./Components/FolderPath";
import AddFilesButton from "./Components/AddFilesButton";
import AllFiles from "../../Components/Others/Files/index.js";
import PageSettings from './Components/PageSettings.jsx'
import {HomeFiles} from '../../Apis/Api.js'
// import LogOut from '../../Components/Main/Header/LogOut.jsx'
import AppContext from '../../Context_Api/AppContext.js'

function Index() {

  const [openSettings,setOpenSettings]=useState(false);
  const {state,dispatch}=useContext(AppContext)
  const [offsetHeightHome,setOffsetHeightHome]=useState(null);
  const [offsetWidthHome,setOffsetWidthHome]=useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuDimension,setMenuDimension]=useState({horizontal:"right",vertical:"bottom"})

  const {openFoldersPath,openSideBar}=state
  const homeSettingsRef=useRef()
  const homeRef=useRef()

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

    event.preventDefault();
  
    const target = event.target;
    const rect = target.getBoundingClientRect();

    const X = event.clientX - rect.left;
    const Y = event.clientY - rect.top;

    setCursorPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    checkPosition()    
    setOpenSettings(true);

    homeSettingsRef.current.style.left=`${X-210}px`;

    if(offsetHeightHome-cursorPosition.y<243){ homeSettingsRef.current.style.top = ''; homeSettingsRef.current.style.bottom=`2px`; }

    else{ homeSettingsRef.current.style.top=`${Y}px` }
};

  const handleMouseMove = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    if(!openSettings){
  
      setCursorPosition({ x: x, y: y });
      checkPosition()
    }

  };

  return (
  
  <div className="w-full h-full bg-green-00 flex justify-end  text-4xl" >
      
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
      
        <div className="w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative"  onContextMenu={handleWindowMouseMove} ref={homeRef} onMouseMove={handleMouseMove}>
      
          <AllFiles data={HomeFiles}/>
      
          <div className={`absolute ${ openSettings ? "flex" : "hidden" }`} ref={homeSettingsRef}>
          
            <PageSettings closeSetting={()=>setOpenSettings(false)} menuDimension={menuDimension}/>
          
          </div>
      
        </div>
      
        <div className="w-full h-[70px] flex bg-green-00 relative justify-between items-end px-2 pb-2">
      
          <div className="flex gap-2 text-sm font-medium ">
      
            <span>5 Folders</span>
      
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

      {/* <div>
        <LogOut/>
      </div> */}
    
    </div>
  
  );
}

export default Index;
