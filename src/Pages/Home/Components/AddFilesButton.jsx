import React from 'react'
import { IoMdAdd } from "react-icons/io";
import CreateDocImg from '../../../Assets/Images/create-doc-img.png'
import CreateFolderImg from '../../../Assets/Images/craete-folder-img.png'

function AddFilesButton() {
    return (
        <div className='h-[170px] items-center justify-end overflow-hidden flex flex-col gap-2  bg-red-00 pb-100px]'>
            <div className='w-[45px] h-[45px] rounded-full center bg-[#2D2D2D]'>
                <img src={CreateFolderImg} className='w-[23px]'/>
            </div>
            <div className='w-[45px] h-[45px] rounded-full center bg-[#2D2D2D]'>
                <img src={CreateDocImg} className='w-[23px]'/>
            </div>
            <div className='w-[50px] h-[50px] rounded-full center bg-[#2D2D2D]'>
                <IoMdAdd size={30} color='white' />
            </div>
        </div>
    )
}

export default AddFilesButton
