import React, { useEffect, useState } from 'react'
import TabFolderIcon from '../../../Assets/Images/tabFolderIcon.png'
import { RxCross2 } from "react-icons/rx";

function Tabs({ name, tabsInnerRef,tabs,setTabs, index, currentTabIndex, setCurrentTabIndex,tabsRef }) {


    const [tabType, setTabType] = useState("common")
    const [updateTabsStyle,setUpdateTabsStyle]=useState(1)
    const tabStyle=tabType == "prev" ? "h-full bg-[#373737] hover:bg-[#434343  rounded-br-[7px] text-[#B6B6B6]" : tabType == "selected" ? "h-[95%] bg-white text-[#373737] rounded-tr-[7px] rounded-tl-[7px]" : tabType == "selected" && currentTabIndex == 0 ? "h-[95%] bg-white rounded-tr-[7px] rounded-tl-[7px]" : tabType == "next" ? "h-full bg-[#373737] hover:bg-[#434343 rounded-bl-[7px] text-[#B6B6B6]" : tabType == "common" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" : tabType == "last" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" : null


    useEffect(() => {

        if (tabs[currentTabIndex]?.name == name) { setTabType("selected") }
        else if (tabs[currentTabIndex + 1]?.name == name) { setTabType("next") }
        else if (tabs[currentTabIndex - 1]?.name == name) { setTabType("prev") }
        else if (tabs[tabs.length - 1]?.name == name) { setTabType("last") }
        else { setTabType("common") }

    }, [name,currentTabIndex,tabs,updateTabsStyle,tabsRef])

    const closeTab=(event,name,index)=>{ 
        if(index+1) setCurrentTabIndex(index+1)
        else setCurrentTabIndex(index-1)
        event.stopPropagation()
        event.preventDefault()
        setUpdateTabsStyle(updateTabsStyle+1)
        const filterTabs=tabs.filter(tab=>tab.name !== name)
        if(tabsInnerRef || tabsRef){

        tabsInnerRef.current[index].style.display="none";
        tabsRef.current[index].style.width="0px";
        setTimeout(() => { tabsRef.current[index].style.display="none" }, 500);

        setTabs(filterTabs)
    }
    }


    return (
      
        <div onClick={() => setCurrentTabIndex(index)} className={`w-[180px] h-[95%]  flex items-end justify-center transition-all delay-70 duration-500 ease-in-out ${tabType == "prev" ? "bg-white" : tabType == "selected" ? "bg-[#373737]" : tabType == "next" ? "bg-white" : null}`} ref={(element) => tabsRef.current[index] = element}>
            
            <div onClick={() => setCurrentTabIndex(index)} className={`w-full  flex justify-center text-base center hover:cursor-pointer transition-all delay-70 duration-500 ease-in-out ${tabStyle}  `}  >

                <div className={`w-[96%] h-[80%] flex items-center ${tabType != "selected" ? "hover:bg-[#434343]" : null} rounded-[2px] pr-[2px]`} ref={(element) => tabsInnerRef.current[index] = element}>
        
                    <div className='pl-2 w-full flex items-center'>
        
                        <img src={TabFolderIcon} className='h-[18px]' />
        
                        <a className="pl-2 text-sm font-[system-ui]">{name} </a>
        
                    </div>
                
                    <div className={`w-[30px] flex justify-start items-center h-[70%] bg-gray-00  border-gray-500 ${tabType == "selected" || tabType == "prev" ? "border-none" : "border-r-[2px] "} `} onClick={(event)=>closeTab(event,name,index)}>
                
                        <RxCross2 size={16} className='hover:cursor-pointer' color={`${tabType == "selected" ? "black" : "#B3B3B3 "} `} />
                
                    </div>
                
                </div>
            
            </div>
        
        </div>
    )
}

export default Tabs
