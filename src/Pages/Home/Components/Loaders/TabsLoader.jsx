
import React, { useEffect, useState } from 'react'

function TabsLoader({ name, tabsInnerRef, tabs , index, currentTabIndex, tabsRef }) {


    const [tabType, setTabType] = useState("common")
    const tabStyle = tabType == "prev" ? "h-full bg-slate-500 rounded-br-[7px] " : tabType == "selected" ? "h-[95%] bg-white  rounded-tr-[7px] rounded-tl-[7px]" : tabType == "selected" && currentTabIndex == 0 ? "h-[95%] bg-white rounded-tr-[7px] rounded-tl-[7px]" : tabType == "next" ? "h-full bg-slate-500 rounded-bl-[7px] text-[#B6B6B6]" : tabType == "common" ? "h-full bg-slate-500 " : tabType == "last" ? "h-full bg-slate-500" : null


    useEffect(() => {

        if (tabs[currentTabIndex]?.name == name) { setTabType("selected") }
        else if (tabs[currentTabIndex + 1]?.name == name) { setTabType("next") }
        else if (tabs[currentTabIndex - 1]?.name == name) { setTabType("prev") }
        else if (tabs[tabs.length - 1]?.name == name) { setTabType("last") }
        else { setTabType("common") }

    }, [name, currentTabIndex, tabs])


    return (

        <div  className={`w-[180px] h-[95%]  flex items-end justify-center transition-all delay-70 duration-500 ease-in-out ${tabType == "prev" ? "bg-white" : tabType == "selected" ? "bg-slate-500" : tabType == "next" ? "bg-white" : null}`} >

            <div  className={`w-full  flex justify-center text-base center hover:cursor-pointer transition-all delay-70 duration-500 ease-in-out ${tabStyle}  `}  >

                <div className={`w-[96%] h-[80%] flex gap-2 items-center rounded-[2px] pr-[2px]`} >

                    <div className='pl-2 w-full flex center gap-2 duration-100 transition-all delay-70 ease-in-out animate-pulse '>

                        <div  className='h-[18px] w-[18px] rounded-full bg-slate-300 duration-100 transition-all delay-70 ease-in-out animate-pulse ' ></div>

                        <div className="pl-2 text-sm font-[system-ui] w-[90%] h-[10px] bg-slate-300 duration-100 transition-all delay-70 ease-in-out animate-pulse  rounded-full"> </div>

                    </div>

                    <div className={`w-[30px] flex justify-start items-center h-[70%] bg-gray-00  border-white ${tabType == "selected" || tabType == "prev" ? "border-none" : "border-r-[2px] "} `} >

                        <div className='w-[10px] h-[10px] bg-slate-300 rounded-[1px] duration-100 transition-all delay-70 ease-in-out animate-pulse '></div>
                    </div>

                </div>

            </div>

        </div>
    )
}


export default TabsLoader
