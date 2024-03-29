import React, { useContext } from 'react'
import folderIcon from '../../../../Assets/Images/folderIcon.png'
import PublicfolderIcon from '../../../../Assets/Images/PublicfolderIcon.png'
import FolderSaved from '../../../../Assets/Images/folderSaved.png'
import FileSettings from '../FileSettings/index'
import { FolderSettingsData , SavedFolderSettingsData  } from '../MapList/SettingsList'
import AppContext from '../../../../Context_Api/AppContext.js'

function Folder({ visibility, name, index, homeFilesSettingRef }) {

    const {state,dispatch}=useContext(AppContext)

    const FileSetting=(event)=>{
        event.stopPropagation()
        dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: true, event: event, index: index }})
    }

    return (
        <div className='w-[120px] h-auto rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2' onContextMenu={FileSetting}>

            <div className=' bg-green-00 center flex-col rounded-[4px] relative'>

                {visibility == "public"
                    ?
                    <img src={PublicfolderIcon} className='bg-red-00' />
                    : visibility == "private" ?
                    <img src={folderIcon} className='bg-red-00' />
                    : visibility == "saved" ?           
                    <img src={FolderSaved} className='bg-red-00' />
                    :null

                }

                <span className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>

                    {name}
                
                </ span>

                <FileSettings
                    homeFilesSettingRef={homeFilesSettingRef}
                    index={index}
                    FolderSettingsData={visibility=="public" || visibility=="private" ? FolderSettingsData() : visibility=="saved" ? SavedFolderSettingsData():null}
                    closeFileSettings={() =>dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: false, event: null, index: null }})}
                />

            </div>

        </div>
    )
}

export default Folder
