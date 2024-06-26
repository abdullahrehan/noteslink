import React from 'react'
import { RxCross2 } from "react-icons/rx";
import loader from '../../Assets/Images/loader.gif'

function PopUp({ title, width, height, crossFunction,children,loading=false }) {
    return (
        <>
        <div className='fixed z-50 top-0 left-0 w-[100vw] h-[100vh] bg-[#0007] center '>
            <div className={`${width} ${height} relative bg-[#EAEAEA] rounded-[5px] ${loading?"blur-sm":""} flex flex-col`}>
            {/* <div className={`w-[${width}px] h-[${height}px] bg-[#EAEAEA] rounded-[5px]  flex flex-col`}> */}
                <div className='flex justify-between px-2 pt-[1px] text-center'>
                    <div className=' '></div>
                    <div className='text-lg font-medium'>{title}</div>
                    <div className='pt-1 hover:cursor-pointer' onClick={crossFunction}><RxCross2 color='black' size={24} /></div>
                </div>
                <div className='w-[95%] h-full center flex flex-col'>
                    {children}
                </div>
            </div>

            {/* </div> */}
            <div className={`${width} ${height} bg-[#EAEAEA] rounded-[5px] ${loading?"center":"hidden"}  flex flex-col opacity-60 bg-gray-200  absolute l-0 t-0 `}>
                    <img src={loader} className='w-[35px]'/>
            </div>

        </div>
        </>
    )
}

export default PopUp
