 import React from 'react'
import { HiDotsVertical } from "react-icons/hi";

function FolderPath() {
    return (
        <div className='h-full text-sm bg-red-00 flex items-center justify-between ml-1 '>

            <div className='flex gap-1 text-gray-500'>
                <div>
                    
                </div>
                <span className='underline underline-offset-1 hover:cursor-pointer'>My Computer</span>
                <span>/</span>
                <span className='underline underline-offset-1 hover:cursor-pointer'>React</span>
                <span>/</span>
                <span className='underline underline-offset-1 hover:cursor-pointer'>Hooks</span>
                <span>/</span>

            </div>

            <div className='flex'>
                <div className='bg-red-200 w-[170px]'>
                    <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search '/>
                </div>
            </div>

        </div>
    )
}

export default FolderPath
