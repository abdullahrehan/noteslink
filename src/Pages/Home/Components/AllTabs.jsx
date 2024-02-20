import React, { useState } from 'react'
import Tabs from './Tabs'

function AllTabs() {

    const [currentTabIndex,setCurrentTabIndex]=useState(5)

    const tabs=[
        {name:"My Folder"},
        {name:"React"},
        {name:"NodeJs"},
        {name:"Express Js"},
        {name:"MongoDb"},
        {name:"Heroku"},
    ]
    

    return (
        <div className='w-full h-full flex gap-0'>
           {tabs.map((data,index)=>
            <Tabs name={data.name} index={index}  setCurrentTabIndex={(data)=>setCurrentTabIndex(data)} tabType={index==0 ? 0 : index==tabs.length-1 ? 2 : 1} tabs={tabs} currentTabIndex={currentTabIndex}/>
            )}

        </div>
    )
}

export default AllTabs
