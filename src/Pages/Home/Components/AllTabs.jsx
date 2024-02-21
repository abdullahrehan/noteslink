import React, { useState } from 'react'
import Tabs from './Tabs'
import { IoMdAdd } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
function AllTabs() {

    const [currentTabIndex, setCurrentTabIndex] = useState(1)

    const tabs = [
        { name: "My Folder" },
        { name: "React" },
        { name: "NodeJs" },
        { name: "Express Js" },
        { name: "MongoDb" },
        { name: "Heroku" },
    ]


    return (
        <div className='w-full h-full center '>
            <div className='w-[99.5%] h-full flex flex-col '>
            {/* <div className='w-full h-[1px] bg-[#373737] '></div> */}
            <div className='flex w-full h-full bg-[#373737] items-end rounded-[3px]'>
                <div className='w-[8px] h-full bg-white'>
                    <div className={`w-[8px] h-full bg-[#373737] ${currentTabIndex == 0 ? "rounded-tl-[3px] rounded-bl-[3px] rounded-br-[7px]" : null}`}></div>
                </div>
                {tabs.map((data, index) =>
                    <Tabs name={data.name} index={index} setCurrentTabIndex={(data) => setCurrentTabIndex(data)} tabType={index == 0 ? 0 : index == tabs.length - 1 ? 2 : 1} tabs={tabs} currentTabIndex={currentTabIndex} />
                )}
                {/* <div className='w-[8px] h-full bg-white'>
                    <div className={`w-[8px] h-full bg-[#373737] ${currentTabIndex == tabs.length - 1 ? "rounded-bl-[7px]" : null}`}></div>
                </div> */}
                <div className='flex items-center justify-around h-full  px-1'>
                    <div className='px-1'>
                        <IoMdAdd size={18}  color='#B3B3B3'/>
                    </div>
                    <div className='px-1'>
                        {/* <FiLock size={17} color='#B3B3B3'/> */}
                        <FiUnlock size={17} color='#B3B3B3'/>
                    </div>
                </div>
            </div>
    
            </div>
        </div>
    )
}

export default AllTabs
