import React, { useEffect } from 'react'
import FolderSettings from './FileSettings'

function Index({settingsRef,openFileSettings,index,FolderSettingsData,closeFileSettings}) {

    const openFolderSettingFunc = (e) => {
        e.preventDefault();
        settingsRef.current[openFileSettings?.index].style.display = "flex"
        console.log(settingsRef?.current,index,'a');        
    }

    const closeFolderSetting = () => {
        settingsRef.current[openFileSettings?.index].style.display = "none";
        closeFileSettings();
    }

    useEffect(()=>{

        if(openFileSettings?.value){
            openFolderSettingFunc(openFileSettings?.event)
        }
        else{
            closeFolderSetting()
        }

    },[openFileSettings?.value])

    
  return (
    <>
        <div className='absolute top-[40%] left-[40%] z-20  hidden' ref={(element) => settingsRef.current[openFileSettings?.index] = element}>
      
            <FolderSettings settings={FolderSettingsData} closeFolderSetting={() => closeFolderSetting()} />
      
        </div>
    </>
  )
}

export default Index
