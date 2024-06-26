import React, { useContext, useState } from 'react'
import PopUp from '../../../Components/Others/PopUp'
import AppContext from '../../../Context_Api/AppContext.js'
import { FaRegFolderOpen } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { setDoc, doc, getDocs, where, query, collection } from 'firebase/firestore';
import { fdb } from "../../../Firebase/firebaseConfig.js";
import { useNavigate, useParams } from "react-router-dom";

function NewFolder() {

  const { state, dispatch } = useContext(AppContext)
  const [error, setError] = useState(false)
  const [folderName, setFolderName] = useState(null)
  const { folderID } = useParams();
  const [loading,setLoading]=useState(false)


  const closeFunction = () => { dispatch({ type: 'setNewFolderNamePopup', newFolderNamePopupAction: false }) }

  const makeId = (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  const data = {
    id: makeId(40),
    name: folderName,
    type: 'folder',
    status: 'private',
    keywords: [],
    content: [],
    parent: folderID == undefined ? "" : folderID,
    path: [],
    interactions: 5,
    strikeStatus: null,
    createdAt: Date.now(),
    deleteAt: Date.now(),
    modifiedAt: Date.now(),
    owner: state.email.split('@')[0].toLocaleLowerCase(),
    sharedWith: [],
    editors: [],
    bookmarks: [],
    viewers: [],
    size: null,
  }

  const createNewFolder = async () => {
    setLoading(true)
    const userEmail = localStorage.getItem("userEmail").split("@")[0].trim().toLowerCase();
    const folderIdValue = folderID === undefined ? "" : folderID;

    const fileQuery = query(
      collection(fdb, "files"),
      where("owner", "==", userEmail),
      where("parent", "==", folderIdValue),
      where("name", "==", folderName),
      where("type", "==", 'folder')
    );

    const querySnapshot = await getDocs(fileQuery);
    if (querySnapshot.empty) {

      await setDoc(doc(fdb, "files", data.id), data).then(() => { dispatch({ type: 'setNewFolderNamePopup', newFolderNamePopupAction: false });setLoading(false); console.log("show loader");dispatch({ type: "setLoadHomeFiles", loadHomeFilesAction: true }); });
    }else{
      alert("Folder Name Already exists, use a different name!");

    }

  }


  return (
    <PopUp title={"Create New Folder"} width='w-[420px]' height='h-[220px]' loading={loading} crossFunction={closeFunction}>
      <div className={`flex flex-col  ${error ? "gap-2" : "gap-6"} pt-5 h-full w-[90%]`}>
        <div className='flex flex-col gap-3'>
          <div className='w- full text-base '>
            Please Enter a Name for the new folder .
          </div>
          <div className='w-full h-[40px] flex w-[90%] bg-white rounded-[3px]'>
            <div className='w-[15%] h-full center' >
              <FaRegFolderOpen size={22} color='#AEAEAE' />
            </div>
            <div className='w-[85%] h-full flex items-center'>

              <input className='bg-red-00 w-[90%] h-[80%] text-base  outline-none ' placeholder='Enter Folder Name' onChange={(e) => setFolderName(e.target.value)} value={folderName} />

            </div>
          </div>
          <div className={`flex text-red-600 text-sm gap-2 items-center ${error ? "block" : "hidden"} `}>
            <div><BiError color='red' /></div>
            <div>Please enter a valid Name</div>
          </div>
        </div>
        <div className='w- full center text-base font-medium'>
          <button className='p-3 bg-[#434343] hover:bg-[#2D2D2D] text-white rounded-[5px]' onClick={createNewFolder}>Create Folder</button>
        </div>
      </div>
    </PopUp>

  )
}

export default NewFolder
