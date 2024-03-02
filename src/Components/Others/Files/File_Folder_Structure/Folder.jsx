import React, { useState } from 'react'
import folderIcon from '../../../../Assets/Images/folderIcon.png'
import PublicfolderIcon from '../../../../Assets/Images/PublicfolderIcon.png'
import FileSettings from '../FileSettings/index'
import { FolderSettingsData } from '../MapList/SettingsList'

function Folder({ visibility, name, index, settingsRef }) {

    const [openFileSettings, setOpenFileSettings] = useState({
        value: false,
        event: null,
        index: null
    })


    return (
        <div className='w-[120px] h-auto rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2' onContextMenu={(e) => setOpenFileSettings({ value: true, event: e, index: index })}>

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
                    settingsRef={settingsRef}
                    index={index}
                    FolderSettingsData={FolderSettingsData}
                    openFileSettings={openFileSettings}
                    closeFileSettings={() => setOpenFileSettings({ ...openFileSettings, value: false })}
                />
            </div>

        </div>
    )
}

export default Folder
