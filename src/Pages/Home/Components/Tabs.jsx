import React, { useEffect, useState } from 'react'
import TabFolderIcon from '../../../Assets/Images/tabFolderIcon.png'
import { RxCross2 } from "react-icons/rx";
import AppContext from "../../../Context_Api/AppContext.js";
import { useContext } from "react";
import {
    FieldValue,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

import { fdb } from "../../../Firebase/firebaseConfig.js";

function Tabs({ setLoading, name, tabsInnerRef, tabs, setTabs, index, id, currentTabIndex, setCurrentTabIndex, tabsRef }) {


    const [tabType, setTabType] = useState("common")
    const [updateTabsStyle, setUpdateTabsStyle] = useState(1)
    const tabStyle = name == "dummyTabForMyComputer" ? "bg-[#373737] h-full rounded-bl-[7px]" : tabType == "prev" ? "h-full bg-[#373737] hover:bg-[#434343  rounded-br-[7px] text-[#B6B6B6]" : tabType == "selected" ? "h-[95%] bg-white text-[#373737] rounded-tr-[7px] rounded-tl-[7px]" : tabType == "selected" && currentTabIndex == 0 ? "h-[95%] bg-white rounded-tr-[7px] rounded-tl-[7px]" : tabType == "next" ? "h-full bg-[#373737] hover:bg-[#434343 rounded-bl-[7px] text-[#B6B6B6]" : tabType == "common" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" : tabType == "last" ? "h-full bg-[#373737] hover:bg-[#434343 text-[#B6B6B6]" : null
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    let newArray = [];


    useEffect(() => {

        if (tabs[currentTabIndex]?.name == name) { setTabType("selected") }
        else if (tabs[currentTabIndex + 1]?.name == name) { setTabType("next") }
        else if (tabs[currentTabIndex - 1]?.name == name) { setTabType("prev") }
        else if (tabs[tabs.length - 1]?.name == name) { setTabType("last") }
        else { setTabType("common") }

    }, [name, currentTabIndex, tabs, updateTabsStyle, tabsRef])

    const closeTab = async (event, name, index) => {
        event.stopPropagation()
        event.preventDefault()

        if (index !== 0) {
            setCurrentTabIndex(index - 1)
            let tabNew = tabs.findIndex(item => item.id === id) - 1;
            const newId = tabs[tabNew].id
            const email = await state.email

            const q = await getDocs(
                query(collection(fdb, "files"), where("parent", "==", newId), where('owner', '==', email.split('@')[0]))
            )
                .then(async (querySnapshot) => {
                    newArray = []
                    querySnapshot.forEach((doc) => {
                        newArray.push(doc.data());
                    });
                    await updateDoc(doc(fdb, "users", state.email.trim()), {
                        tabs: tabs.filter((data)=>data.id!==id),
                    })
                        .then(async() => {
                            const data = await getDoc(doc(fdb, 'users', localStorage.getItem("userEmail")))
                            dispatch({
                                type: "setRefreshTabs",
                                refreshTabsAction: true,
                            });
                            setUpdateTabsStyle(updateTabsStyle + 1)
                            // if(index!==currentTabIndex){
                            dispatch({
                                type: "setHomeCurrentFoler",
                                openHomeSetingsAction: { name: newArray.name, data: newArray },
                            });
                            // } 
                        }).catch((e) => {
                            console.error(e);

                        })

                })
                .catch((e) => console.log(e));






        }



        // console.log(id, 'asdasda',tabNew)
        // const filterTabs = tabs.filter(tab => tab.name !== name)
        if (tabsInnerRef || tabsRef) {

            // tabsInnerRef.current[index].style.display = "none";
            // tabsRef.current[index].style.width = "0px";
            // setTimeout(() => { tabsRef.current[index].style.display = "none" }, 500);

            // setTabs(filterTabs)


            // console.log(email)



        }
    }

    const openTab = async (Index, Id, changeTab) => {

        setLoading(true)

        console.log(index, id)
        navigate(`/noteslink/${id}`)

        setCurrentTabIndex(Index)
        // newArray = []

        // const email = await state.email
        // const q = await getDocs(
        //     query(collection(fdb, "files"), where("parent", "==", Id), where('owner', '==', email.split('@')[0]))
        // )
        //     .then((querySnapshot) => {
        //         newArray = []
        //         dispatch({
        //             type: "setHomeCurrentFoler",
        //             openHomeSetingsAction: { name: newArray.name, data: [""] },
        //         });
        //         querySnapshot.forEach((doc) => {
        //             newArray.push(doc.data());
        //         });
        //         console.log('asdfghjn', newArray)

        //     }).then(() => {
        //         setLoading(false)
        //         dispatch({
        //             type: "setHomeCurrentFoler",
        //             openHomeSetingsAction: { name: newArray.name, data: newArray },
        //         });

        //     })
        //     .catch((e) => console.log(e));
    }



    return (

        <div onClick={() => openTab(index, id)} className={`w-[180px] h-[95%]  flex items-end justify-center transition-all delay-70 duration-500 ease-in-out ${tabType == "prev" ? "bg-white" : tabType == "selected" ? "bg-[#373737]" : tabType == "next" ? "bg-white" : null}`} ref={(element) => tabsRef.current[index] = element}>

            <div className={`w-full  flex justify-center text-base center hover:cursor-pointer transition-all delay-70 duration-500 ease-in-out ${tabStyle}  `}  >

                {name != "dummyTabForMyComputer" ?
                    <div className={`w-[96%] h-[80%] flex items-center ${tabType != "selected" ? "hover:bg-[#434343]" : null} rounded-[2px] pr-[2px]`} ref={(element) => tabsInnerRef.current[index] = element}>

                        <div className='pl-2 w-full flex items-center'>


                            <img src={TabFolderIcon} className='h-[18px]' />

                            <div className="pl-2 text-sm font-[system-ui]">{name} </div>

                        </div>

                        <div className={`w-[30px] flex justify-start items-center h-[70%] bg-gray-00  border-gray-500 ${tabType == "selected" || tabType == "prev" ? "border-none" : "border-r-[2px] "} `} onClick={(event) => closeTab(event, name, index)}>


                            <RxCross2 size={16} className='hover:cursor-pointer' color={`${tabType == "selected" ? "black" : "#B3B3B3 "} `} />

                        </div>

                    </div>
                    : null}

            </div>

        </div>
    )
}

export default Tabs
