import React, { useContext, useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { GoBold } from "react-icons/go";
import { RiItalic } from "react-icons/ri";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniListBullet } from "react-icons/hi2";
import { IoIosShareAlt } from "react-icons/io";
import loader from '../../../Assets/Images/loader.gif'


function OpenedFile() {

    const { state, dispatch } = useContext(AppContext)
    const { renameFilePopup, saveFilePopup } = state
    const [openSaveOptions, setSaveOptions] = useState(true)
    const [fileSaved, setFileSaved] = useState(false)
    const [fileName, setFileName] = useState(null)
    const [fileContent, setFileContent] = useState(null)
    const [fileLink, setFileLink] = useState(null)
    const [showSharedEmail, setShowSharedEmail] = useState(false)


    const settingsIcon = [
        { icon: <GoBold size={18} />, function: () => { } },
        { icon: <RiItalic size={18} />, function: () => { } },
        { icon: <AiOutlineUnderline size={18} />, function: () => { } },
        { icon: <HiMiniListBullet size={18} />, function: () => { } },
    ]




    useEffect(() => {

        if (state.savedFileViewerContent.value) {
            setFileName(state.savedFileViewerContent.name);
            setFileLink(state.savedFileViewerContent.urls !== undefined ? state.savedFileViewerContent.urls[0] : undefined);
            setFileContent(state.savedFileViewerContent.content);
        }
        else if (state.sharedFileViewerContent.value) {
            setFileName(state.sharedFileViewerContent.name);
            setFileLink(state.sharedFileViewerContent.urls !== undefined ? state.sharedFileViewerContent.urls[0] : undefined);
            setFileContent(state.sharedFileViewerContent.content);
        }

    }, [state.savedFileViewerContent])



    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[50%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={() => dispatch({ type: "setSavedFileViewerContent", savedFileViewerContentAction: { value: false, id: null, name: null, content: null, url: null } })}>

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
                        </div>

                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>

                    </div>

                    <div className='w-[33%] h-full flex justify-end items-end pr-1 pb-2 bg-red-00 gap-3 '>

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


                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[70px]" : "delay-200 bottom-[45px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium' ><FiSave size={16} className='' /></div>

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

                           

                        </div>




                    </div>
                </div>

                <div className={`h-full ${renameFilePopup.value || fileSaved ? "flex" : "hidden"} center w-full absolute top-0 left-0 bg-[#0002] backdrop-blur-sm  rounded-[5px] flex flex-col center`}>

                    <div className='text-base gap-2 items-center flex font-medium'>
                      
                        <img src={loader} className='w-[35px]'/>

                    </div>

                </div>
            </div>
          

        </div>
    )
}

export default OpenedFile
