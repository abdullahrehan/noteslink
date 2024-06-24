import React, { useContext, useRef, useState, useEffect } from "react";
import AppContext from "../../Context_Api/AppContext.js";
import NavigationFolder from "../../Components/Others/NavigationFolder.jsx";
import SavedFile from "../../Assets/Images/saved-file-icon.png";
import FolderPath from "../../Components/Others/FolderPath.jsx";
import AllFiles from "../../Components/Others/Files/index.js";
import { HomeFiles } from "../../Apis/Api.js";
import file_loader from '../../Assets/Images/loader.gif'

import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";


function Index() {

  const { state, dispatch } = useContext(AppContext);

  const { openFoldersPath, openHomeSetings, refreshData, fileViewerContent, openFileSettings } = state;
  // const [folderData, setFolderData] = useState(data);

  const homeSettingsRef = useRef([]);
  const { folderID } = useParams();


  const path = ["Public Files"];

  const user = "mahed442@gmail.com";

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // getData();
    dispatch({ type: "setRefreshData", refreshDataAction: true })
    console.log('37')
  }, []);


  const closeFileSettings = () => {
  
      console.log(homeSettingsRef.current,openFileSettings)
    if (homeSettingsRef.current[openFileSettings?.index] !== undefined) {
      homeSettingsRef.current[openFileSettings?.index].style.display ="none"
    }
    dispatch({type: "setOpenFileSettings",openFileSettingsAction: { value: false, event: null, index: null }});
  
  };
  console.log(folderID)


  const getData = async () => {
    
    setloading(true);
    setData([]);


    const q = await getDocs(
      query(
        collection(fdb, "files"),
        where("status", "==", "public"),
        where("owner", "==", Cookies.get("userEmail").slice(1,-1).split("@")[0].trim().toLowerCase())
      )
    )
      .then((querySnapshot) => {
        setData([]);
        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
        });
      })
      .then(()=>{
          
        setloading(false)

    })
      .catch((e) => console.log(e));
  };

  const searchFolderById = async (folderID) => {

    
    let newArray = [];
    let fid = folderID !== undefined ? folderID : "";

    await getDocs(
      query(
        collection(fdb, "files"),
        where("parent", "==", fid),
        where(
          "owner",
          "==",
          localStorage.getItem("userEmail").split("@")[0].trim()
        )
      )
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          newArray.push(doc.data());
        });
      })
      .catch((e) => console.log(e));
    setData(newArray);
    setloading(false)

  };

  useEffect(() => { 
    console.log("folder change");
    setloading(true);
    // dispatch({ type: "setRefreshData", refreshDataAction: true })
    // if(refreshData){ 
      
      if(folderID==undefined){

        getData();
        console.log('data')
      }
      else{
        searchFolderById(folderID)
        console.log('search')
        closeFileSettings()

        // }  // // }
      dispatch({ type: "setRefreshData", refreshDataAction: false })
    } 
  
  } , [refreshData,folderID]);

  console.log(state.searchFileViewerContent)
  useEffect(() => { closeFileSettings() }, [state.searchFileViewerContent,refreshData]);

  

  
  return (
    <div className="w-full h-full bg-green-00 justify-end flex text-4xl">
      <div className="w-full flex flex-col">
        <div
          className={`${
            openFoldersPath ? "w-minus-150px" : "w-full"
          } h-auto bg-red-00 transition-all delay-70 duration-400 ease-in-out`}
        >
          <div className="w-full py-0 bg-red-00 center text-3xl">
            <div className="w-auto border-b-[1px] border-[#CCCCCC] flex items-center">
              <img src={SavedFile} className="w-[28px] h-[28px]" />
              <div className="px-2">Public Files</div>
            </div>
          </div>
          
        </div>

        <div className="w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative">
          {data.length!==0 ? (
            <>
            <div className="h-[40px] w-full bg-red-00">
            {/* <FolderPath path={path} /> */}
          </div>
            <AllFiles
              data={data}
              homeFilesSettingRef={homeSettingsRef}
              loading={false}
              page={"public files"}

            />
            </>
          ) :      loading  ?
          <div className="w-full h-full center flex flex-col gap-5"> 
          <img src={file_loader} className="w-[50px]"/>
          </div>:null}
        </div>
      </div>

      <div
        className={`${
          openFoldersPath ? "w-[220px]" : "w-[0px]"
        } transition-all delay-70 duration-400 ease-in-out h-full ${
          openFoldersPath ? "border-l-[1.5px] border-[#B3B3B3]" : null
        } `}
      >
        <NavigationFolder
          folderName={"Public Files"}
          closeFolders={() =>
            dispatch({ type: "setFolderPath", folderPath: false })
          }
        />
      </div>
    </div>
  );
}

export default Index;
