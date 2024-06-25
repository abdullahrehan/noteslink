import React, { useRef, useState, useEffect, useContext } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { fdb } from "../../../Firebase/firebaseConfig.js";
import AppContext from '../../../Context_Api/AppContext.js'
import TabsLoader from './Loaders/TabsLoader'
import Tabs from './Tabs'

function AllTabs({ setLoading }) {

    const { state, dispatch } = useContext(AppContext)
    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [tabs, setTabs] = useState([])

    const tabsRef = useRef([])
    const tabsInnerRef = useRef([])

    useEffect(() => {

        const fetchTabs = async () => {

            console.log(localStorage.getItem("userEmail"));

            const data = await getDoc(doc(fdb, 'users', localStorage.getItem("userEmail")))
            console.log(data.data())    
            setTabs(data.data().tabs)
            dispatch({type: "setRefreshTabs", refreshTabsAction: false});
        }

        fetchTabs()

    }, [state.email,state.refreshTabs])

    console.log(tabs)


    return (

        <div className='w-full h-full center ' >

            <div className='w-[99.5%] h-full flex flex-col '>

                <div className={`flex w-full h-full ${state.refreshTabs ? "bg-slate-500 " : "bg-[#373737]"} items-end rounded-[3px] ${state.refreshTabs?"gap-[1px]":""}`}>

                    <div className='w-[8px] h-full bg-white'>

                        <div className={`w-[8px] h-full ${state.refreshTabs ? "bg-slate-500 " : "bg-[#373737]"} ${currentTabIndex == 0 ? "rounded-tl-[3px] rounded-bl-[3px] rounded-br-[7px]" : null}`}></div>

                    </div>

                    {state.refreshTabs ?

                        ["","","",""].map((data, index) =>
                           
                            <TabsLoader
                                tabsLoader={true}
                                tabsRef={tabsRef}
                                tabsInnerRef={tabsInnerRef}
                                key={index + 1}
                                index={index}
                                setCurrentTabIndex={(data) => setCurrentTabIndex(data)}
                                tabType={0}
                                tabs={tabs}
                                setTabs={(data) => setTabs(data)}
                                currentTabIndex={0}
                            />
                        )
                    
                    :

                    tabs.map((data, index) =>
                       
                        <Tabs
                            setLoading={setLoading}
                            tabsLoader={true}
                            tabsRef={tabsRef}
                            tabsInnerRef={tabsInnerRef}
                            key={index + 1}
                            name={data.name}
                            tabs= {tabs}
                            id={data.id}
                            index={index}
                            setCurrentTabIndex={(data) => setCurrentTabIndex(data)}
                            tabType={index == 0 ? 0 : index == tabs.length - 1 ? 2 : 1}
                            setTabs={(data) => setTabs(data)}
                            currentTabIndex={currentTabIndex}
                        />
                  
                  )}

                    <div className={`flex items-center justify-around h-full  px-1 ${tabs[1]?.name == "dummyTabForMyComputer" ? "hidden" : "flex"}`}></div>

                </div>

            </div>
        </div>
    )
}

export default AllTabs
