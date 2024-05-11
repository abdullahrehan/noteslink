import React, { useContext, useEffect } from 'react'
import FolderSettings from './FileSettings'
import AppContext from '../../../../Context_Api/AppContext.js'

function Index({page,homeFilesSettingRef,id,data,index,FolderSettingsData,closeFileSettings}) {

    const {state,dispatch}=useContext(AppContext)
    const {openFileSettings}=state
    
    const openFolderSettingFunc = (e) => {
    
        e.preventDefault();
        e.stopPropagation()
    
        if(homeFilesSettingRef?.current){
           homeFilesSettingRef.current[openFileSettings?.index].style.display = "flex";
        }
    }

    const closeFolderSetting = () => {
        if(homeFilesSettingRef?.current[openFileSettings?.index]!==undefined){
            homeFilesSettingRef.current[openFileSettings?.index].style.display = "none";
            closeFileSettings();
            }
        }

    useEffect(()=>{
       
        if(openFileSettings?.value) { openFolderSettingFunc(openFileSettings?.event) }
        else{ closeFolderSetting() }

    },[openFileSettings?.value])

    const settingRef=(element)=>{
        if(homeFilesSettingRef?.current){
            homeFilesSettingRef.current[index] = element
        }

        
    }

    return (
    <>
        <div className='absolute top-[40%] left-[40%] z-20 hidden' ref={(element) => settingRef(element)}>
      
            <FolderSettings page={page} settings={FolderSettingsData} id={id} data={data} closeFileSettings={() => closeFolderSetting()} />
      
        </div>
    </>
  )
}

export default Index
