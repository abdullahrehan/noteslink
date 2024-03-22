import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { GoLink } from "react-icons/go";
import { FiSave } from "react-icons/fi";
import { GoBold } from "react-icons/go";
import { RiItalic } from "react-icons/ri";
import { AiOutlineUnderline } from "react-icons/ai";
import { HiMiniListBullet } from "react-icons/hi2";

function NewFile() {

    const { state, dispatch } = useContext(AppContext)
    const [openSaveOptions, setSaveOptions] = useState(true)
    const settingsIcon = [
        { icon: <GoBold size={18} />, function: () => { } },
        { icon: <RiItalic size={18} />, function: () => { } },
        { icon: <AiOutlineUnderline size={18} />, function: () => { } },
        { icon: <HiMiniListBullet size={18} />, function: () => { } },
    ]

    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009] backdrop-blur-s center '>

            <div className={`h-[92%]  w-[50%] bg-[#EAEAEA] rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute top-0 -right-8 hover:cursor-pointer' onClick={() => dispatch({ type: 'setAddNewTextfile', addNewTextfileAction: false })}>

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

                        <div className='pt-2 pb-1 font-medium text-2xl bg-red-00 center'>React Js</div>

                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>

                    </div>

                    <div className='w-[33%] '>

                    </div>


                </div>

                <div className='w-[95%] h-full  items-center flex flex-col'>

                    <div className='w-full h-[96%] mt-1 relative overflow-hidden bg-red-00 shadow-[inset_-12px_-8px_40px_#46464620] overflow-none' >

                        <textarea className='bg-[#0000] w-full h-[100%] overflow-y-auto scroll-style text-sm p-2 outline-none' spellCheck={false} style={{ resize: 'none' }} value={"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."} />

                        {/* <div> */}
                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[70px]" : "delay-200 bottom-[45px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium '><FiSave size={16} className='' /></div>

                        </div>

                        <div className={`flex text-base gap-2 absolute right-[10px] shadow-[inset_-12px_-8px_40px_#46464620]  transition-all hover:text-black text-white duration-200 ease-linear ${openSaveOptions ? "-bottom-[32px]" : "delay-200 bottom-[10px]"}  w-[32px] h-[32px] bg-[#2D2D2D] hover:bg-gray-300 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>

                            <div className='font-medium '><GoLink size={16} className='' /></div>

                            {/* </div> */}
                        </div>

                    </div>

                    <div className={`w-[100%]  bg-green-00 transition-all duration-500 ease-in-out overflow-hidden  border-black ${openSaveOptions ? 'h-[150px]' : 'h-[0px]'} rounded-tl-[5px] rounded-[5px] borde-t-[px]`}>
                        <div className='w-full relative h-[40%] bg-red-00 flex items-center justify-between pr-2 pl-2 '>
                            <div className='flex text-base gap-2'>
                                <div className='font-medium'>Link</div>
                                <div className='min-w-[200px] h-[30px] rounded-[4px overflow-hidden bg-green-00 flex items-center border-gray-400 border-b-[1px]'><input placeholder='https://www.youtube.com/' className='w-full text-sm pl-2 h-full bg-[#0000] ' /></div>

                            </div>

                            <div className={`flex text-base gap-2 shadow-[inset_-12px_-8px_40px_#46464620] absolute right-[10px] transition-all duration-200 ease-linear  ${openSaveOptions ? "delay-200 top-[10px]" : "-top-[32px]"}  w-[32px] h-[32px] bg-gray-300 hover:bg-gray-400 hover:cursor-pointer center rounded-full `} onClick={() => setSaveOptions(!openSaveOptions)}>
                                <div className='font-medium '><MdKeyboardDoubleArrowUp size={16} /></div>

                            </div>

                        </div>
                        <div className='w-full h-[60%] bg-red-00 center'>
                            <div className='text-base bg-[#2D2D2D] py-3 px-8 rounded-[5px] text-white w-auto' onClick={() => setSaveOptions(!openSaveOptions)}>Save</div>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default NewFile
