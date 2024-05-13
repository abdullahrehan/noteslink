import React, { useContext, useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { GoBold } from "react-icons/go";
import { RiItalic } from "react-icons/ri";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniListBullet } from "react-icons/hi2";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import { doc, updateDoc, getDocs, query, collection } from 'firebase/firestore';
import { fdb } from '../../../Firebase/firebaseConfig.js';
import { IoIosShareAlt } from "react-icons/io";

function OpenedSeachFile() {

    const { state, dispatch } = useContext(AppContext)
    const { renameFilePopup, saveFilePopup } = state
    const [data,setData]=useState([])
    const [openSaveOptions, setSaveOptions] = useState(true)
    const [fileSaved, setFileSaved] = useState(false)
    const likeIcon=useRef()
    const [fileLiked,setFileLinked] = useState(false)

    const likeFile=()=>{
        setFileLinked(true)
    }
    const unlikeFile=()=>{
        setFileLinked(false)
    }

    const closePage=()=>{
        setFileLinked(false)
        dispatch({ type: "setSearchFileViewerContent", searchFileViewerContentAction: { value: false, id: null, name: null, content: null, url: null } })
        
    }

   

    useEffect(() => {
        setData(state.searchFileViewerContent)
    }, [state.searchFileViewerContent])

    console.log(state.searchFileViewerContent)


    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[50%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={closePage}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className='w-[95%] h-[70px] flex bg-red-00 flex justify-between  text-center'>

                    <div className='w-[33%] h-full flex text-xs text-gray-400 items-end pb-2 justify-start gap-1'>

                        file by {data.owner}
                      

                    </div>

                    <div className='w-[33%] text-lg font-medium center flex-col '>

                        <div className='flex gap-5 items-center bg-red-00'>
                            <div className=' h-full '></div>
                            <input className='pt-2 pb-1 h-[40px] w-auto font-medium text-2xl bg-[#0000] outline-none text-center center' placeholder='FileName' value={data.name} />
                        </div>

                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>

                    </div>

                    <div className='w-[33%] h-full flex justify-end items-end pb-2 pr-1 pb-2 bg-red-00 gap-3 text-xs text-gray-400'>

                        Last Modified {data.modifiedAt}
                        
                    </div>


                </div>

                <div className='w-[95%] h-full  items-center flex flex-col'>

                    <div className={`w-full relative h-[96%] mt-1 relative overflow-hidden  bg-red-00 shadow-[inset_-12px_-8px_40px_#46464620] overflow-none`} >

                        <textarea className='bg-[#0000] w-full h-[100%] overflow-y-auto scroll-style text-sm p-2 outline-none' spellCheck={false} style={{ resize: 'none' }}
                            value={data.content}
                            contentEditable={false}
                            placeholder='Enter Data here .....'
                        />


                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[70px]" : "delay-200 bottom-[45px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium' ><FiSave size={16} className='' /></div>

                        </div>

                    </div>

                    <div className={`w-[100%] flex justify-between px-2 items-center bg-green-00 transition-all duration-500 ease-in-out overflow-hidden  border-black ${openSaveOptions ? 'h-[80px]' : 'h-[0px]'} rounded-tl-[5px] rounded-[5px] borde-t-[px]`}>
                      
                        <div className='w-1/2 relative h-[40%] bg-red-00 flex items-center justify-between pr-2 pl-2 '>
                            <div className='flex text-base gap-2 items-center'>
                                <div className='font-medium'>Link</div>
                                <div className='min-w-[200px] h-[30px] rounded-[4px overflow-hidden bg-green-00 flex items-center border-gray-400 border-b-[1px]'><input placeholder='https://www.youtube.com/' className='w-full text-sm pl-2 h-full bg-[#0000] outline-none ' value={data.url} /></div>

                            </div>
                        </div>

                        <div className='w-1/2 h-[60%] bg-red-00 flex items-center justify-end'>

                            <div className={`w-auto bg-red-00  `}>

                                    <div className='flex gap-4'>  <div className='font-medium flex items-center text-[16px] gap-1 center'>
                                        {/* {state.searchFileViewerContent.viewers[0]} */}
                                         12
                                         <LuEye size={21} />
                                    </div>
                                        <div className='font-medium flex items-center text-[16px] gap-1 center hover:cursor-pointer '>
                                            {state.searchFileViewerContent.interactions} 
                                            {fileLiked ?
                                            <BiSolidLike size={21} className='text-blue-500' onClick={unlikeFile}/>
                                        :

                                            <BiLike size={21} className='' ref={likeIcon} onClick={likeFile}/>
                                            }
                                            
                                        </div>

                                    </div> 
                            </div>
                        </div>




                    </div>
                </div>


                
            </div>

        </div>
    )
}

export default OpenedSeachFile
