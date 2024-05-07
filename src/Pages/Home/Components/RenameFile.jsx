import React, { useContext, useState } from 'react'
import PopUp from '../../../Components/Others/PopUp.jsx'
import AppContext from '../../../Context_Api/AppContext.js'
import { FaRegFolderOpen } from "react-icons/fa";
import { fdb, rdb } from "../../../Firebase/firebaseConfig.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BiError } from "react-icons/bi";

function RenameFile({type,Function}) {
  
  const {state,dispatch}=useContext(AppContext)
  const [error,setError]=useState(false)
  const [newName,setNewName]=useState()
  const Rename=()=>{
    console.log(state.renameFolderPopup)
    updateDoc(doc(fdb, "files", state.renameFolderPopup.id), {
      name: newName,
    }).then(()=>{
      dispatch({ type: "setRefreshData", refreshDataAction: true });
      Function()
    })
  }

  return (
      <PopUp title={`Rename ${type} `} width='w-[420px]' height='h-[220px]' crossFunction={Function}>
        <div className={`flex flex-col  ${error? "gap-2":"gap-6" } pt-5 h-full w-[90%]`}>
          <div className='flex flex-col gap-3'>
            <div className='w- full text-base '>
              Please Enter a Name for the {type}.
            </div>
            <div className='w-full h-[40px] flex w-[90%] bg-white rounded-[3px]'>
              <div className='w-[15%] h-full center' >
                <FaRegFolderOpen size={22} color='#AEAEAE'/>
              </div>
              <div className='w-[85%] h-full flex items-center'>
                <input className='bg-red-00 w-[90%] h-[80%] text-base  outline-none ' placeholder={`Enter ${type} Name`} value={newName} onChange={(e)=>setNewName(e.target.value)}/>

              </div>
            </div>
            <div className={`flex text-red-600 text-sm gap-2 items-center ${error?"block":"hidden"} `}>
              <div><BiError color='red'/></div>
              <div>Please enter a valid Name</div>
              {/* <div>This Field is mandatory</div> */}
            </div>
          </div>
          <div className='w- full center text-base font-medium'>
            <button className='p-3 bg-[#434343] hover:bg-[#2D2D2D] text-white rounded-[5px]'onClick={Rename} >Rename {type}</button>
          </div>
        </div>
      </PopUp>

  )
}

export default RenameFile
