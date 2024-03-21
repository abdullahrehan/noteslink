import React, { useContext, useRef, useState } from 'react'
import folderIcon from '../../../../Assets/Images/folderIcon.png'
import PublicfolderIcon from '../../../../Assets/Images/PublicfolderIcon.png'
import FileSettings from '../FileSettings/index'
import { FolderSettingsData } from '../MapList/SettingsList'
import AppContext from '../../../../Context_Api/AppContext.js'

function Folder({ visibility, name, index, homeFilesSettingRef }) {

    const {state,dispatch}=useContext(AppContext)
    // const [openFileSettings, setOpenFileSettings] = useState({
    //     value: false,
    //     event: null,
    //     index: null
    // })
    // console.log(settingsRef.current);

    const FileSetting=(event)=>{
        event.stopPropagation()
        // setOpenFileSettings({ value: true, event: event, index: index })
        dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: true, event: event, index: index }})
    }
//    console.log(homeFilesSettingRef.current);

    return (
        <div className='w-[120px] h-auto rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2' onContextMenu={FileSetting}>

            <div className=' bg-green-00 center flex-col rounded-[4px] relative'>

                {visibility == "public"
                    ?
                    <img src={PublicfolderIcon} className='bg-red-00' />
                    :
                    <img src={folderIcon} className='bg-red-00' />
                }

                <span className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>

                    {name}
                
                </ span>

                <FileSettings
                    homeFilesSettingRef={homeFilesSettingRef}
                    index={index}
                    FolderSettingsData={FolderSettingsData()}
                    // openFileSettings={openFileSettings}
                    closeFileSettings={() =>dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: false, event: null, index: null }})}
                />
            </div>

        </div>
    )
}

export default Folder
