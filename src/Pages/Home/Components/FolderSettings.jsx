import React, { useRef, useState } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

function FolderSettings({closeFolderSetting}) {
    const settings = [
        {
            name: "Open Folder",
            Icon: <FaRegFolderOpen size={20} />
        },
        {
            name: "Make Folder Public",
            Icon: <BsPeople size={20} />
        },
        {
            name: "Add in Tabs",
            Icon: <IoIosAdd size={20} />
        },
        {
            name: "Move Folder",
            Icon: <MdOutlineDriveFileMove size={20} />
        },
        {
            name: "Delete Folder",
            Icon: <MdDeleteOutline size={20} />
        },
    ]
    const [openSettings,setOpenSettings] =useState(false)



    return (
        // <div></div>
        <div className='w-[190px] z-20 h-[220px] bg-[#F0F0F0] rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((data,index) =>
                <>
                    <div className='flex z-20 h-[80px] w-[95%]  h-[20%] gap-2 hover:bg-[#D9D9D9] rounded-[2px] flex items-center pl-2' >
                        <div className=''>{data.Icon}</div>
                        <div className=''>{data.name}</div>
                    </div>
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
                </>
            )}
        <div className='w-[100vw] z-10 h-[100vh] fixed top-0 left-0' onClick={closeFolderSetting} onContextMenu={()=>closeFolderSetting()}></div>    
        </div>
    )
}

export default FolderSettings
