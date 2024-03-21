import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import CreateDocImg from '../../../Assets/Images/create-doc-img.png'
import CreateFolderImg from '../../../Assets/Images/craete-folder-img.png'
import AppContext from '../../../Context_Api/AppContext.js'

function AddFilesButton() {


    const {state,dispatch}=useContext(AppContext)

    const [openAddFiles,setOpenAddFiles] =useState(false);    
    const addFileRef=useRef()
    const addFolderRef=useRef()

    const addbutton=()=>{ setOpenAddFiles(openAddFiles ? false : true) }
    
    useEffect(()=>{
        if(openAddFiles){
            addFileRef.current.style.position="absolute"
            addFileRef.current.style.bottom="0px"
            
            addFolderRef.current.style.position="absolute"
            addFolderRef.current.style.bottom="0px"
                }
        else{
            addFileRef.current.style.bottom="55px"            
            addFolderRef.current.style.bottom="105px"   
        }

    },[openAddFiles])
    

    return (
        <div className='h-[170px] w-[65px] items-center justify-end overflow-hidden flex flex-col gap-2  bg-red-00 pb-100px] relative'>
            <div className='w-[45px] h-[45px] rounded-full center bg-[#2D2D2D] hover:bg-[#202020] hover:cursor-pointer z-10 transition-all delay-70 duration-400 ease-in-out absolute bottom-[105px]' ref={addFolderRef} onClick={() =>dispatch({ type: 'setNewFolderNamePopup', newFolderNamePopupAction:true})}>
                <img src={CreateFolderImg} className='w-[23px] hover:w-[24px]'/>
            </div>
            <div className='w-[45px] h-[45px] rounded-full center bg-[#2D2D2D] hover:bg-[#202020] hover:cursor-pointer z-10 transition-all delay-70 duration-400 ease-in-out absolute bottom-[55px]' ref={addFileRef} onClick={() =>dispatch({ type: 'setAddNewTextfile', addNewTextfileAction:true})}>
                <img src={CreateDocImg} className='w-[23px] hover:w-[24px]'/>
            </div>
            <div className={`w-[50px] h-[50px] rounded-full center ${openAddFiles ? "bg-[#2D2D2D]" : "bg-black"}  hover:bg-[#202020] hover:cursor-pointer z-20 absolute bottom-0`} onClick={addbutton}>
                <IoMdAdd size={30} color='white' />
            </div>
        </div>
    )
}

export default AddFilesButton
