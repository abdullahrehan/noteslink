import React, { useContext, useRef, useState, useEffect } from "react";
import AppContext from "../../Context_Api/AppContext.js";
import NavigationFolder from "../../Components/Others/NavigationFolder.jsx";
import SavedFile from "../../Assets/Images/saved-file-icon.png";
import FolderPath from "../../Components/Others/FolderPath.jsx";
import AllFiles from "../../Components/Others/Files/index.js";
import { HomeFiles } from "../../Apis/Api.js";
import file_loader from '../../Assets/Images/loader.gif'
import DeleteIcon from '../../Assets/Images/DeleteIcon.png'

import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";

function Index() {
  const { state, dispatch } = useContext(AppContext);

  const { openFoldersPath, openHomeSetings, openFileSettings } = state;
  const homeSettingsRef = useRef([]);
  const [loading, setloading] = useState(false);

  const path = ["Saved Files"];

  const user = "mahed442@gmail.com";

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setData([]);
    setloading(true)

    const q = await getDocs(
      query(
        collection(fdb, "recycleBin"),
        where("owner", "==", localStorage.getItem("userEmail").split("@")[0].trim().toLowerCase()),
        where("head", "==", true),
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

  console.log(data)

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
              <img src={DeleteIcon} className="w-[40px] h-[40px]" />
              <div className="px-2">Delete Files</div>
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
              page={"delete files"}

            />
            </>
          ) :       loading  ?
          <div className="w-full h-full center flex flex-col gap-5"> 
          <img src={file_loader} className="w-[50px]"/>
          </div>:null}
        </div>
      </div>

      
    </div>
  );
}

export default Index;
