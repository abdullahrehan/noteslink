import React from 'react'
import PathFolder from './PathFolder'
import Data from "../../../Apis/Folder.json";
import { RxCross2 } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

function NavigationFolder({ closeFolders }) {

  return (

    <div className='w-full h-full flex flex-col relative overflow-hidden'>

      <div className='h-[95%] bg-red-00'>

        <div className='w-full bg-red-00 flex justify-between center pr-2'>

          <PathFolder name={"My Folders"} />

          <div className=' absolute  bg-red-00 right-[2px] top-[2px]'>
            <RxCross2 size={20} className='hover:cursor-pointer ' color={"black"} onClick={closeFolders} />
          </div>
        </div>

        <div className='flex flex-col pl-8'>

          {Data.map((data, index) => data.parent == "My Folders" ? <PathFolder key={index} name={data.name} /> : null)}

        </div>

      </div>

      <div className='h-[5%] px-2 py-1 flex text-sm font-medium justify-between items-end'>

        <div>5 Folders</div>

        <div>Size 1.7GB</div>

      </div>

    </div>
  )
}

export default NavigationFolder
