import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { GoLink } from "react-icons/go";
import { FiSave } from "react-icons/fi";
import { GoBold } from "react-icons/go";
import { RiItalic } from "react-icons/ri";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniListBullet } from "react-icons/hi2";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdPublic } from "react-icons/md";
import { MdPublicOff } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { LuEye } from "react-icons/lu";
import { MdSaveAlt } from "react-icons/md";
import { setDoc, doc } from 'firebase/firestore';
import { fdb } from '../../../Firebase/firebaseConfig.js';

function NewFile() {

    const { state, dispatch } = useContext(AppContext)
    const { renameFilePopup, saveFilePopup } = state
    const [openSaveOptions, setSaveOptions] = useState(true)
    const [fileSaved, setFileSaved] = useState(false)
    const [openFileTypeSetting, setOpenFileTypeSetting] = useState(false)
    const [fileTypeSetting, setFileTypeSetting] = useState("private")
    const [fileName, setFileName] = useState(null)
    const [fileContent, setFileContent] = useState(null)
    const [fileLink, setFileLink] = useState(null)
    // const [fileType, setFileType] = useState("private")
    const settingsIcon = [
        { icon: <GoBold size={18} />, function: () => { } },
        { icon: <RiItalic size={18} />, function: () => { } },
        { icon: <AiOutlineUnderline size={18} />, function: () => { } },
        { icon: <HiMiniListBullet size={18} />, function: () => { } },
    ]

    // useEffect(() => {
    //     if (fileSaved) {
    //         setTimeout(() => {
    //             setFileSaved(false)
    //         }, 1500);
    //     }
    // }, [fileSaved])

    const changeFileType = (value) => {
        if (value !== fileTypeSetting) {
            setFileTypeSetting(value)
            setOpenFileTypeSetting(false)
        }
    }
    function makeId(length) {
        let result = ''
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let counter = 0
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
            counter += 1
        }
        return result
    }
    const createFile = async () => {
        setFileSaved(true)
        const data = {
            id: makeId(40),
            name: fileName,
            type: "file",
            status: fileTypeSetting,
            keywords: [],
            content: [fileContent],
            parent: state.homeCurrentFoler.data[0]?.parent,
            path: [""],
            interactions: 0,
            likes: 0,
            likedBy: [],
            strikeStatus: 0,
            createdAt: Date.now(),
            deleteAt: null,
            modifiedAt: Date.now(),
            owner: state.email.split('@')[0].toLowerCase(),
            sharedWith: [],
            size: null,
            bookmarks: [],
            editors: [],
            viewers: [],
            urls: [fileLink],
        }
        await setDoc(doc(fdb, "files", data.id), data).then(() => {
            console.log("data sent ", data.id,state.homeCurrentFoler.data[0]?.parent);
            setFileSaved(false)
            setTimeout(() => {
                dispatch({ type: 'setAddNewTextfile', addNewTextfileAction: false })
                dispatch({ type: "setRefreshData", refreshDataAction: true });

            }, 100)

        })
    }
    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[50%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={() => dispatch({ type: 'setAddNewTextfile', addNewTextfileAction: false })}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className='w-[95%] h-[70px] flex bg-red-00 flex justify-between  text-center'>

                    <div className='w-[33%] h-full flex items-end justify-start gap-1'>

                        {settingsIcon.map(data =>

                            <div className={`w-[30px] h-[30px] bg-gray-00 hover:cursor-pointer shadow-[inset_-12px_-8px_40px_#46464620]  center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                                <div className='font-medium '>{data.icon}

                                </div>
                            </div>

                        )}

                    </div>

                    <div className='w-[33%] text-lg font-medium center flex-col '>

                        <div className='flex gap-5 items-center bg-red-00'>
                            <div className=' h-full '></div>
                            <input className='pt-2 pb-1 h-[40px] w-auto font-medium text-2xl bg-[#0000] outline-none text-center center' placeholder='FileName' onChange={(e) => setFileName(e.target.value)} value={fileName} />
                            {/* <div className=' h-full -5 flex justify-end items-center text-gray-500 hover:text-black hover:cursor-pointer' onClick={() => dispatch({ type: 'setRenameFilePopup', renameFilePopupAction: true })}><MdOutlineModeEditOutline /></div> */}
                        </div>
                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>

                    </div>

                    <div className='w-[33%] h-full flex justify-end items-end pr-1 pb-2 bg-red-00 gap-3 '>

                        {/* <div className='w-[30px] h-[30px] bg-red-00 hover:cursor-pointer rounded-full center shadow-[inset_-12px_-8px_40px_#46464620] ' onClick={() => dispatch({ type: 'setSaveFilePopup', saveFilePopupAction: true })}>
                            <MdSaveAlt size={18} />
                        </div> */}

                        <div className='w-[100px] h-[25px] relative rounded-[2px] borde border-gray-500 center hover:cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] ' onClick={() => setOpenFileTypeSetting(!openFileTypeSetting)}>
                            <div className='w-[70%] center text-base gap-1'><MdPublic size={15} />{fileTypeSetting == "public" ? "Public" : "Private"}</div>
                            <div className='w-[30%] h-full  center bg-red-00' >
                                <IoIosArrowDown size={16} />
                            </div>

                            <div className={`absolute center ${openFileTypeSetting ? "flex" : "hidden"} flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-around w-full h-[60px] bg-[#EAEAEA] rounded-[2px]  borde border-gray-500 z-50 top-[30px]`}>
                                <button className='w-[90%] h-[45%] flex items-center pl-1 gap-1 hover:cursor-pointer hover:bg-gray-200 text-base' disabled={fileTypeSetting == "public" ? true : false} onClick={() => changeFileType("public")}><MdPublic size={15} />Public</button>
                                <div className='w-[90%] h-[1px] bg-gray-500'></div>
                                <button className='w-[90%] h-[45%] flex items-center pl-1 gap-1 hover:cursor-pointer hover:bg-gray-200 text-base' disabled={fileTypeSetting == "private" ? true : false} onClick={() => changeFileType("private")}><MdPublicOff size={15} />Private</button>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='w-[95%] h-full  items-center flex flex-col'>

                    <div className={`w-full relative h-[96%] mt-1 relative overflow-hidden  bg-red-00 shadow-[inset_-12px_-8px_40px_#46464620] overflow-none`} >

                        <textarea className='bg-[#0000] w-full h-[100%] overflow-y-auto scroll-style text-sm p-2 outline-none' spellCheck={false} style={{ resize: 'none' }}
                            value={fileContent}
                            contentEditable={true}
                            placeholder='Enter Data here .....'
                            onChange={(e) => setFileContent(e.target.value)}
                        />

                        {/* <div className={`w-full h-full z-60 top-0 left-0 absolute  ${openFileTypeSetting || saveFilePopup ? "bg-[#0000] backdrop-blur-sm" : null}`}></div> */}

                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[70px]" : "delay-200 bottom-[45px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setFileSaved(true)}>

                            <div className='font-medium' ><FiSave size={16} className='' /></div>

                        </div>

                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[32px]" : "delay-200 bottom-[10px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium '><GoLink size={16} className='' /></div>


                        </div>

                    </div>

                    <div className={`w-[100%]  bg-green-00 transition-all duration-500 ease-in-out overflow-hidden  border-black ${openSaveOptions ? 'h-[150px]' : 'h-[0px]'} rounded-tl-[5px] rounded-[5px] borde-t-[px]`}>
                        <div className='w-full relative h-[40%] bg-red-00 flex items-center justify-between pr-2 pl-2 '>
                            <div className='flex text-base gap-2'>
                                <div className='font-medium'>Link</div>
                                <div className='min-w-[200px] h-[30px] rounded-[4px overflow-hidden bg-green-00 flex items-center border-gray-400 border-b-[1px]'><input placeholder='https://www.youtube.com/' className='w-full text-sm pl-2 h-full bg-[#0000] outline-none ' onChange={(e) => setFileLink(e.target.value)} /></div>

                            </div>

                            <div className={`flex text-base gap-2 shadow-[inset_-12px_-8px_40px_#46464620] absolute right-[10px] transition-all duration-200 ease-linear  ${openSaveOptions ? "delay-200 top-[10px]" : "-top-[32px]"}  w-[32px] h-[32px] bg-gray-300 hover:bg-gray-400 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>
                                <div className='font-medium '><MdKeyboardDoubleArrowUp size={16} /></div>

                            </div>

                        </div>
                        <div className='w-full h-[60%] bg-red-00 flex center justify-between'>

                            <div className={`w-[150px] bg-red-00  `}>
                                {fileTypeSetting == "public" ?
                                    <div className='flex gap-2'>  <div className='font-medium flex items-center text-[14px] gap-1 center'>
                                        30 <LuEye size={19} />
                                    </div>
                                        <div className='font-medium flex items-center text-[14px] gap-1 center'>
                                            14 <AiOutlineLike size={19} />
                                        </div>
                                        <div className='font-medium flex items-center text-[14px] gap-1 center'>
                                            15 <AiOutlineDislike size={19} />
                                        </div>
                                    </div> : null}
                            </div>

                            <div className='text-base bg-[#2D2D2D] py-3 px-8 rounded-[5px] text-white w-auto hover:cursor-pointer hover:bg-[#434343] '
                                onClick={createFile}>Save</div>
                            <div className='w-[150px]'></div>
                        </div>




                    </div>
                </div>

                <div className={`h-full ${renameFilePopup.value || fileSaved ? "flex" : "hidden"} center w-full absolute top-0 left-0 bg-[#0002] backdrop-blur-sm  rounded-[5px] flex flex-col center`}>

                    <div className='text-base gap-2 items-center flex font-medium'>
                        <div><FaRegFileAlt /></div>
                        <div>File Saved</div>
                    </div>

                </div>



            </div>

        </div>
    )
}

export default NewFile
