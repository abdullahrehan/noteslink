import React, { useEffect, useRef, useState, useContext } from "react";
import AllTabs from "./Components/AllTabs";
import NavigationFolder from "../../Components/Others/NavigationFolder.jsx";
import NavigationFolderPath from "./Components/Loaders/NavigationFolderPath.jsx";
import TabFolderIcon from "../../Assets/Images/tabFolderIcon.png";
import FolderPath from "../../Components/Others/FolderPath.jsx";
import FolderPathLoader from "./Components/Loaders/FolderPathLoader.jsx";
import AddFilesButton from "./Components/AddFilesButton";
import AllFiles from "../../Components/Others/Files/index.js";
import PageSettings from "./Components/PageSettings.jsx";
import { HomeFiles } from "../../Apis/Api.js";
import NewFolder from "./Components/NewFolder.jsx";
import RenameFile from "./Components/RenameFile.jsx";
import NewFile from "./Components/NewFile.jsx";
import OpenedFile from "./Components/OpenedFile.jsx";
import DeleteFile from "../../Components/Others/DeleteFile.jsx";
import SaveFile from "../../Components/Others/SaveFile.jsx";
import AppContext from "../../Context_Api/AppContext.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import NotesVector from '../../Assets/Images/Notes.gif'
import Cookies from 'js-cookie';
import loader from '../../Assets/Images/loader.gif'
import { NavLink, useNavigate } from "react-router-dom";


function Index() {
  const { state, dispatch } = useContext(AppContext);
  const {
    logoutPopup,
    refreshData,
    newFolderNamePopup,
    renameFilePopup,
    renameFolderPopup,
    deletFilePopup,
    addNewTextfile,
    saveFilePopup,
    fileViewerContent
  } = state;
  const [offsetHeightHome, setOffsetHeightHome] = useState(null);
  // const [currentFolder,setCurrentFolder]=useState(null)
  const [offsetWidthHome, setOffsetWidthHome] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // const [accountCookie,setAccountCookie]=useState(false)
  const [pageLoading, setPageLoading] = useState(true);

  const [menuDimension, setMenuDimension] = useState({
    horizontal: "right",
    vertical: "bottom",
  });
  const [nofilesavailable,setNoFilesAvaiiable]=useState(false)

  const { openFoldersPath, openHomeSetings, openFileSettings } = state;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const homeSettingsRef = useRef();
  const homeRef = useRef();
  const homeFilesSettingRef = useRef([]);
  const [data, setData] = useState([]);
  

  useEffect(()=>{
    if(!Cookies.get("userEmail")){
      navigate("/auth")
    }

  },[])

  useEffect(() => {
    if (homeRef.current !== undefined) {
      const { offsetWidth, offsetHeight } = homeRef.current;
      setOffsetHeightHome(offsetHeight);
      setOffsetWidthHome(offsetWidth);
    }

  
  
  }, []);

 
  useEffect(() => {

    if(refreshData){
      getData();
      dispatch({ type: "setRefreshData", refreshDataAction: false });
}
    // }
    // saveFilePopup
  }, [refreshData]);

  useEffect(()=>{
    if(data.length>0){
      dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: {name:"My Computer",data:data} });
    }
  },[data])

  
  const getData = async () => {

    setPageLoading(true)
    console.log(state.homeCurrentFoler,state.homeCurrentFoler.name=="My Computer"?"":state.homeFolderPath[state.homeFolderPath.length-1],state.homeFolderPath[state.homeFolderPath.length-1]);
    await getDocs(
      query(
        collection(fdb, "files"),
        where("owner", "==", Cookies.get("userEmail").slice(1,-1).split('@')[0].trim().toLowerCase()),
        where("parent", "==", state.homeCurrentFoler.name=="My Computer"?"":state.homeFolderPath[state.homeFolderPath.length-1])
      )
    )
      .then((querySnapshot) => {
        setData([]);
        
        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
        });
        
      })
      .then(()=>{
        // setPageLoading(false)
        setLoading(false);


      })

      .catch((e) => console.log(e));
  };

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

  const closePopUp = () => {
    dispatch({
      type: "setOpenAccountSettings",
      openAccountSettingsAction: false,
    });
    dispatch({ type: "setOpenNotifications", openNotificationsAction: false });
    dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });
  };
  const checkPosition = () => {
    if (
      cursorPosition.x >= HorizontalRange.leftTop.left &&
      cursorPosition.x <= HorizontalRange.leftTop.right
    ) {
      if (
        cursorPosition.y >= HorizontalRange.leftTop.top &&
        cursorPosition.y <= HorizontalRange.leftTop.bottom
      ) {
        setMenuDimension({ horizontal: "right", vertical: "bottom" });
      } else if (
        cursorPosition.y >= HorizontalRange.leftBottom.top &&
        cursorPosition.y <= HorizontalRange.leftBottom.bottom
      ) {
        setMenuDimension({ horizontal: "right", vertical: "top" });
      }
    } else if (
      cursorPosition.x >= HorizontalRange.rightTop.left &&
      cursorPosition.x <= HorizontalRange.rightTop.right
    ) {
      if (
        cursorPosition.y >= HorizontalRange.rightTop.top &&
        cursorPosition.y <= HorizontalRange.rightTop.bottom
      ) {
        setMenuDimension({ horizontal: "left", vertical: "bottom" });
      } else if (
        cursorPosition.y >= HorizontalRange.rightBottom.top &&
        cursorPosition.y <= HorizontalRange.rightBottom.bottom
      ) {
        setMenuDimension({ horizontal: "left", vertical: "top" });
      }
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
      homeFilesSettingRef.current[openFileSettings?.index].style.display =
        "none";
    }
    dispatch({
      type: "setOpenFileSettings",
      openFileSettingsAction: { value: false, event: null, index: null },
    });
  };

  const loadingAnnimation = () => {
    setTimeout(() => {
    }, 1500);
  };

  useEffect(() => {
    closeFileSettings();
  }, [renameFilePopup, renameFolderPopup, deletFilePopup]);


  // console.log(data.length==0,'data');

  return (
    <div
      className="w-full h-full bg-green-00 flex justify-end  text-4xl"
      onClick={closeFileSettings}
      // onLoad={loadingAnnimation}
    >
      
      <div
        className={`${
          openFoldersPath ? "w-minus-220px" : "w-full"
        } h-full bg-red-00 transition-all delay-70 duration-400 ease-in-out `}
      >
        <div className={`w-full h-[35px] bg-green-00 flex items-center `}>
          <AllTabs loading={loading} />

          <div className="w-[40px] h-full hover:cursor-pointer rounded-full bg-#0002] center">
            <img
              src={TabFolderIcon}
              className="h-[18px] hover:h-[19px]"
              onClick={() =>
                dispatch({ type: "setFolderPath", folderPath: true })
              }
            />
          </div>
        </div>

        <div className={`w-full h-[45px] `}>
          {loading ? (
            <FolderPathLoader />
          ) : (
            <FolderPath folderdata={data} />
          )}
        </div>

        {/* <div className={`${data.length==0?"flex":"hidden"} h-minus-150px flex flex-col w-full center`}>
        
          <img src={NotesVector} className="h-[80%]"/>
        
          <div>Create New Notes</div>
          
        </div> */}

        {/* <div className={`${pageLoading?"flex":"hidden"} h-minus-150px flex flex-col w-full center`}>
        
          <img src={loader} className="h-[50px]"/>
                  
        </div> */}

        <div
          className={`w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative flex`}
          onContextMenu={handleWindowMouseMove}
          ref={homeRef}
          onMouseMove={handleMouseMove}
          onClick={closePopUp}
        >
          <AllFiles

            data={state.homeCurrentFoler.data}
            homeFilesSettingRef={homeFilesSettingRef}
            loading={loading}
            page={"home"}
          />

          <div
            className={`absolute ${openHomeSetings ? "flex" : "hidden"}`}
            ref={homeSettingsRef}
          >
            <PageSettings menuDimension={menuDimension} />
          </div>
        </div>

        
        {newFolderNamePopup ? <NewFolder userData={data} /> : null}
        {renameFilePopup ? (
          <RenameFile
            type="File"
            Function={() =>
              dispatch({
                type: "setRenameFilePopup",
                renameFilePopupAction: false,
              })
            }
          />
        ) : null}
        {renameFolderPopup ? (
          <RenameFile
            type="Folder"
            Function={() =>
              dispatch({
                type: "setRenameFolderPopup",
                renameFolderPopupAction: false,
              })
            }
          />
        ) : null}
        {deletFilePopup ? (
          <DeleteFile
            type="File"
            Function={() =>
              dispatch({
                type: "setDeletFilePopup",
                deletFilePopupAction: false,
              })
            }
          />
        ) : null}
        {saveFilePopup ? (
          <SaveFile
            type="File"
            Function={() =>
              dispatch({ type: "setSaveFilePopup", saveFilePopupAction: false })
            }
          />
        ) : null}
        {addNewTextfile ? <NewFile /> : null}
        {fileViewerContent.value ? <OpenedFile /> : null}


        <div className="w-full h-[70px] flex bg-green-00 relative justify-between items-end px-2 pb-2">
          {loading ? (
            <div className="flex gap-2 text-sm font-medium ">
              <div className="bg-slate-400 animate-pulse w-[80px] h-[15px] rounded-full "></div>

              <div className="bg-slate-400 animate-pulse w-[80px] h-[15px] rounded-full "></div>
            </div>
          ) : (
            <div className={`flex gap-2 text-sm font-medium ${data.length==0?"hidden":"flex"}` }>
              <div>5 Folders </div>

              <div>Size 1.5Gb</div>
            </div>
          )}
          <div className="absolute bottom-2 right-2">
            <AddFilesButton />
          </div>
        </div>
      </div>

      <div
        className={`${
          openFoldersPath ? "w-[220px]" : "w-[0px]"
        } transition-all delay-70 duration-400 ease-in-out h-full ${
          openFoldersPath ? "border-l-[1.5px] border-[#B3B3B3]" : null
        } `}
      >
        {loading ? (
          <NavigationFolderPath />
        ) : (
          <NavigationFolder
            folderName={"Main Files"}
            closeFolders={() =>
              dispatch({ type: "setFolderPath", folderPath: false })
            }
          />
        )}
      </div>
    </div>
  );
}

export default Index;
