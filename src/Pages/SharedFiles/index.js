import React, { useContext, useRef, useState, useEffect } from "react";
import AppContext from "../../Context_Api/AppContext.js";
import AllFiles from "../../Components/Others/Files/index.js";
import file_loader from "../../Assets/Images/loader.gif";
import sharedFiles from "../../Assets/Images/sharedFiles.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb } from "../../Firebase/firebaseConfig.js";

function Index() {

  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(AppContext);
  const { openFoldersPath } = state;

  const [loading, setloading] = useState(false);
  const homeSettingsRef = useRef([]);

  const getData = async () => {
    setData([]);
    setloading(true);

    const q = await getDocs(
      query(
        collection(fdb, "files"),
        where(
          "bookmarks",
          "array-contains",
          state.email.split("@")[0].trim().toLowerCase()
        )
      )
    )
      .then((querySnapshot) => {
        setData([]);
        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
        });
      })
      .then(() => {
        setloading(false);
      })
      .catch((e) => console.log(e));
  };

  
  useEffect(() => {
    getData();
  }, []);


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
              <img src={sharedFiles} className="w-[40px] h-[40px]" />
              <div className="px-2">Shared Files</div>
            </div>
          </div>
        </div>

        <div className="w-full h-minus-150px bg-green-00 px-1 bg-red-00 relative">
          {data.length !== 0 ? (
            <AllFiles
              data={data}
              homeFilesSettingRef={homeSettingsRef}
              loading={false}
              page={"delete files"}
            />
          ) : loading ? (
            <div className="w-full h-full center flex flex-col gap-5">
              <img src={file_loader} className="w-[50px]" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Index;
