import React, { useEffect, useState } from 'react'
import TabFolderIcon from '../../../Assets/Images/tabFolderIcon.png'
import { RxCross2 } from "react-icons/rx";

function Tabs({ name, tabs, index ,currentTabIndex , setCurrentTabIndex}) {

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

    }, [name])




    return (
        <div 
        onClick={()=>setCurrentTabIndex(index)}
        
        className={`w-[200px] h-[95%]  flex items-end justify-center
        ${
            tabType == "prev" ? "bg-white" :
            tabType == "selected" ? "bg-[#373737]" :
                tabType == "next" ? "bg-white" :

                    null}
`}>
            <div
                onClick={()=>setCurrentTabIndex(index)}

                className={`w-full  flex justify-around text-base center hover:cursor-pointer   
                ${
                    tabType == "prev" ? "h-full bg-[#373737] hover:bg-[#434343] rounded-br-[7px] text-[#B6B6B6]" :
                    tabType == "selected" && currentTabIndex==0 ? "h-[95%] bg-white rounded-tr-[7px]" :
                    tabType == "selected" && currentTabIndex!=0 ? "h-[95%] bg-white rounded-tl-[7px] rounded-tr-[7px]" :
                        tabType == "next" ? "h-full bg-[#373737] hover:bg-[#434343] rounded-bl-[7px] text-[#B6B6B6]" :
                            tabType == "common" ? "h-full bg-[#373737] hover:bg-[#434343] text-[#B6B6B6]" :
                                tabType == "last" ? "h-full bg-[#373737] hover:bg-[#434343] text-[#B6B6B6]" :

                                    null}
                `}
                >




                <img src={TabFolderIcon} />
                {name}
                {/* {tabType} */}
                <RxCross2 size={16} className='hover:cursor-pointer' color="#B3B3B3" />
                <div className={`w-[1.5px] h-[70%] bg-gray-500 
                ${tabType == "selected" || tabType == "last" || tabType == "prev" ? "opacity-0" : null
                    }
                `}></div>

            </div>
        </div>
    )
}

export default Tabs
