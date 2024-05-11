import React, { useContext, useState } from 'react'
import { MdPublic } from "react-icons/md";
import FileSettings from '../FileSettings/index'
import { FileSettingsData , SavedFileSettingsData,PublicFileSettingsData,SearchFileSettingsData } from '../MapList/SettingsList'
import { FaBookmark } from "react-icons/fa";
import AppContext from '../../../../Context_Api/AppContext.js'


function MainFiles({page, content ,id, visibility, data,name , index , homeFilesSettingRef }) {
    
    const {state,dispatch}=useContext(AppContext)

    const FolderSetting=(event)=>{
        event.stopPropagation()
        event.preventDefault();
        dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: true, event: event, index: index }})

    }

   
    return (
    
    <div className='w-[120px] center flex-col text-sm h-auto py-2 gap-0  rounded-[4px] hover:cursor-pointer hover:bg-gray-200 relative'  onContextMenu={FolderSetting} >
    
          <div className='bg-gray-00 w-[110px] h-[86px] flex items-center justify-center'>  
    
            <div className='w-[95px] relative text-[10px] h-[70px] bg-gray-400 border-[#4A4A4A] border-[2px] rounded-[6px] overflow-hidden p-[2px]'>
            
               <div className='w-full h-full rounded-[4px] rounded-br-[45px] bg-white pl-[2px] font-medium'>
            
                    {content}
            
                </div>
            
                <div className={`absolute bottom-0 right-0 ${visibility=="public" || visibility=="saved" ?"flex":"hidden"}`}>
                    {visibility=="public" ?
                    <MdPublic size={17}/> :
                    visibility=="saved" ?
                    <FaBookmark size={14}/>:
                    null}
                    </div>
            
            </div>
    
            </div>
            
            <div className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>
           
                {name}
           
            </div>

            <FileSettings 
                homeFilesSettingRef={homeFilesSettingRef}
                index={index} 
                id={id}
                data={data}
                // FolderSettingsData={ visibility=="public" || visibility=="private" ? FileSettingsData(data) : visibility=="saved" ? SavedFileSettingsData() : null }
                FolderSettingsData={page=="home"?FileSettingsData(data):page=="public files"?PublicFileSettingsData(data):page=="search files"?SearchFileSettingsData(data):null}
                closeFileSettings={() =>dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: false, event: null, index: null }})}
/>
        </div>

    )
}

export default MainFiles
