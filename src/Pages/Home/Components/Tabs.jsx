import React, { useEffect, useState } from 'react'
import TabFolderIcon from '../../../Assets/Images/tabFolderIcon.png'
import { RxCross2 } from "react-icons/rx";

function Tabs({ name, tabs, index, currentTabIndex, setCurrentTabIndex }) {

    // ["start","center","end","commonm"]
    const [tabType, setTabType] = useState("common")

    useEffect(() => {
        if (tabs[currentTabIndex]?.name == name) {
            setTabType("selected")
        }
        else if (tabs[currentTabIndex + 1]?.name == name) {
            setTabType("next")
        }
        else if (tabs[currentTabIndex - 1]?.name == name) {
            setTabType("prev")
        }
        else if (tabs[tabs.length - 1]?.name == name) {
            setTabType("last")
        }
        else {
            setTabType("common")
        }

    }, [name,currentTabIndex])

    console.log(currentTabIndex,tabType,'currentTabIndex');



    return (
        <div
            onClick={() => setCurrentTabIndex(index)}

            className={`w-[180px] h-[95%]  flex items-end justify-center
        ${tabType == "prev" ? "bg-white" :
                    tabType == "selected" ? "bg-[#373737]" :
                        tabType == "next" ? "bg-white" :

                            null}
`}>
            <div
                onClick={() => setCurrentTabIndex(index)}

                className={`w-full  flex justify-center text-base center hover:cursor-pointer   
                ${tabType == "prev" ? "h-full bg-[#373737] hover:bg-[#434343  rounded-br-[7px] text-[#B6B6B6]" :
                        tabType == "selected" ? "h-[95%] bg-white text-[#373737] rounded-tr-[7px] rounded-tl-[7px]" :
                        tabType == "selected" && currentTabIndex == 0 ? "h-[95%] bg-white rounded-tr-[7px] rounded-tl-[7px]" :
                            tabType == "next" ? "h-full bg-[#373737] hover:bg-[#434343 rounded-bl-[7px] text-[#B6B6B6]" :
                                tabType == "common" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" :
                                    tabType == "last" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" :

                                        null}
                `}
            >


                <div className={`w-[96%] h-[80%] flex items-center ${tabType != "selected" ? "hover:bg-[#434343]" : null} rounded-[2px] pr-[2px]`}>
                    <div className='pl-2 w-full flex items-center'>
                        <img src={TabFolderIcon} className='h-[18px]' />
                        <spam className="pl-2 text-sm font-[system-ui]">{name} </spam>
                    </div>

                    <div className={`w-[30px] flex justify-start items-center h-[70%] bg-gray-00  border-gray-500 ${tabType == "selected" || tabType == "prev" ? "border-none" : "border-r-[2px] "} `}>
                        <RxCross2 size={16} className='hover:cursor-pointer' color={`${tabType == "selected" ? "black" : "#B3B3B3 "} `} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabs
