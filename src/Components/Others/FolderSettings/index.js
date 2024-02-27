import React, { useEffect, useRef } from 'react'
import FolderSettings from './FolderSettings'

function Index({folderSettingsRef,closeSettings,index,openSettings,openSettingsIndex,FolderSettingsData}) {

    // const folderSettingsRef=useRef([])
    console.log(index);
    const openFolderSetting = (e) => {
        // e.preventDefault();
        folderSettingsRef.current[index].style.display = "flex"
        console.log(folderSettingsRef?.current,index,'a');        
    }

    const closeFolderSetting = () => {
        folderSettingsRef.current[index].style.display = "none";
        closeSettings()
    }

    useEffect(()=>{

        if(openSettings){
            openFolderSetting(openSettingsIndex)
        }
        else{
            closeFolderSetting(openSettingsIndex)
        }

    },[openSettings])

    
  return (
    <>
        <div className='absolute top-[40%] left-[40%] z-20  hidden' ref={(element) => folderSettingsRef.current[index] = element}>
      
            <FolderSettings settings={FolderSettingsData} closeFolderSetting={() => closeFolderSetting()} />
      
        </div>
    </>
  )
}

export default Index
