import React, { useContext } from 'react'
import folderIcon from '../../../../Assets/Images/folderIcon.png'
import PublicfolderIcon from '../../../../Assets/Images/PublicfolderIcon.png'
import FolderSaved from '../../../../Assets/Images/folderSaved.png'
import FileSettings from '../FileSettings/index'
import { FolderSettingsData , SavedFileSettingsData ,PublicFolderSettingsData , SearchFolderSettingsData ,DeleteFileSettingsData ,SharedFileSettingsData} from '../MapList/SettingsList'
import AppContext from '../../../../Context_Api/AppContext.js'

function Folder({ page,id,visibility,data,name,index, homeFilesSettingRef }) {

    const {state,dispatch}=useContext(AppContext)

    const FileSetting=(event)=>{
        event.stopPropagation()
        dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: true, event: event, index: index }})
    }

    console.log(data,'data')

    return (

        <div className={`w-[125px] h-auto rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2`} onContextMenu={FileSetting}>

            <div className='w-full bg-green-00 center flex-col rounded-[4px] relative'>

                { visibility == "public" ? <img src={PublicfolderIcon} className='bg-red-00' /> : visibility == "private" ? <img src={folderIcon} className='bg-red-00' /> : visibility == "saved" ? <img src={FolderSaved} className='bg-red-00' /> :null }

                <span className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>

                    {name}
                
                </ span>

                {page=="search files"
                ?
                <>
                <span className='text-sm text-gray-400 bg-gray-00 w-full px-2 h-auto inline-block text-center break-words'>

                    {data.owner}
                
                </ span>
                
                <span className='text-sm text-gray-400 bg-gray-00 w-full px-2 h-auto inline-block text-center break-words '>

                    <div className='text-xs text-gray-400'>{data.interactions[0]}</div>
                    <div className='text-xs text-gray-400'>1 month ago</div>
                
                </span>
               
                </>
    : null
    }

            {/* {page=="delete files"
                ?
                <>
                <span className='text-sm text-gray-400 bg-gray-00 w-full px-2 h-auto inline-block text-center break-words'>

                    1 day ago
                
                </ span>

                </>
            : null
            } */}

    
                <FileSettings
                    page={page}
                    homeFilesSettingRef={homeFilesSettingRef}
                    index={index}
                    id={id}
                    data={data}
                    // FolderSettingsData={visibility=="public" || visibility=="private" ? FolderSettingsData() : visibility=="saved" ? SavedFolderSettingsData():null}
                    FolderSettingsData={page=="home"?FolderSettingsData(data):page=="public files"?PublicFolderSettingsData(data):page=="search files"?SearchFolderSettingsData(data):page=="delete files"?DeleteFileSettingsData(data):page=="saved files"?SavedFileSettingsData(data):page=="shared files"?SharedFileSettingsData(data):null}
                    closeFileSettings={() =>dispatch({ type: 'setOpenFileSettings', openFileSettingsAction:{ value: false, event: null, index: null }})}
                />

            </div>

        </div>
    )
}

export default Folder
