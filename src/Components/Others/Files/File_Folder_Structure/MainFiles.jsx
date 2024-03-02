import React, { useState } from 'react'
import { MdPublic } from "react-icons/md";
import FileSettings from '../FileSettings/index'
import { FileSettingsData } from '../MapList/SettingsList'


function MainFiles({ content , visibility, name , index , settingsRef }) {
    
    const [openFileSettings,setOpenFileSettings]=useState({
        value:false,
        event:null,
        index:null
    })


    return (
    
    <div className='w-[120px] center flex-col text-sm h-auto py-2 gap-0  rounded-[4px] hover:cursor-pointer hover:bg-gray-200 relative'  onContextMenu={(e)=>setOpenFileSettings({value:true,event:e,index:index})} >
    
          <div className='bg-gray-00 w-[110px] h-[86px] flex items-center justify-center'>  
    
            <div className='w-[95px] relative text-[10px] h-[70px] bg-gray-400 border-[#4A4A4A] border-[2px] rounded-[6px] overflow-hidden p-[2px]'>
            
               <div className='w-full h-full rounded-[4px] rounded-br-[45px] bg-white pl-[2px] font-medium'>
            
                    {content}
            
                </div>
            
                <div className={`absolute bottom-0 right-0 ${visibility=="public"?"flex":"hidden"}`}><MdPublic size={17}/></div>
            
            </div>
    
            </div>
            
            <div className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>
           
                {name}
           
            </div>

            <FileSettings 
                settingsRef={settingsRef}
                index={index} 
                FolderSettingsData={FileSettingsData}
                openFileSettings={openFileSettings}
                closeFileSettings={() => setOpenFileSettings({ ...openFileSettings, value: false })}/>

        </div>

    )
}

export default MainFiles
