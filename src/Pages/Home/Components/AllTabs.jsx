import React, { useRef, useState,useEffect } from 'react'
import Tabs from './Tabs'
import { FiLock } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
import TabsLoader from './Loaders/TabsLoader'
function AllTabs({loading}) {

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [lockTabs, setLockTabs] = useState(1)
    const tabsRef=useRef([])
    const tabsInnerRef=useRef([])
    const [noData,setNoData]=useState(false)

    const [tabs,setTabs] = useState( [
        { name: "My Folder" },
        { name: "React" },
        { name: "NodeJs" },
        { name: "Express Js" },
        { name: "MongoDb" },
        { name: "Heroku" },
    ])

    useEffect(()=>{

        if(tabs.length==1) {
            setTabs([...tabs,{name:"dummyTabForMyComputer"}])
        }

    },[])


    return (
        <div className='w-full h-full center '>
            
            <div className='w-[99.5%] h-full flex flex-col '>
            
            <div className={`flex w-full h-full
            
             ${loading ? "bg-slate-500 " : "bg-[#373737]"}
             
             items-end rounded-[3px]`}>
            
                <div className='w-[8px] h-full bg-white'>
            
                    <div className={`w-[8px] h-full ${loading ? "bg-slate-500 " : "bg-[#373737]"} ${currentTabIndex == 0 ? "rounded-tl-[3px] rounded-bl-[3px] rounded-br-[7px]" : null}`}></div>
            
                </div>

                {tabs.map((data, index) =>
                loading ?
                <TabsLoader
                 tabsLoader={true}
                 tabsRef={tabsRef}
                 tabsInnerRef={tabsInnerRef}
                 key={index+1}
                //  name={data?.name}
                 index={index}
                 setCurrentTabIndex={(data) => setCurrentTabIndex(data)}
                 tabType={0}
                 tabs={tabs}
                 setTabs={(data)=>setTabs(data)}
                 currentTabIndex={0}
                 />
                 :
            //   null
                  <Tabs  
                 tabsLoader={true}
                 tabsRef={tabsRef}
                 tabsInnerRef={tabsInnerRef}
                 key={index+1}
                 name={data.name}
                 index={index}
                 setCurrentTabIndex={(data) => setCurrentTabIndex(data)}
                 tabType={index == 0 ? 0 : index == tabs.length - 1 ? 2 : 1}
                 tabs={tabs}
                 setTabs={(data)=>setTabs(data)}
                 currentTabIndex={currentTabIndex}
                 />
                )}            
               
                <div className={`flex items-center justify-around h-full  px-1 ${ tabs[1]?.name=="dummyTabForMyComputer" ? "hidden":"flex"}
                    `}>
                
                    <div className={`px-1 hover:cursor-pointer ${loading ? "hidden":"flex"}`} onClick={()=>setLockTabs(!lockTabs)}>
                    { lockTabs ?
                        <FiLock size={17} color='red'/> 
                :
                        <FiUnlock size={17} color='#B3B3B3'/>
                    }
                    </div>
                
                </div>
            
            </div>
    
            </div>
        </div>
    )
}

export default AllTabs
