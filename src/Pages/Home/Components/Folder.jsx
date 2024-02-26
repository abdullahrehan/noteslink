import React from 'react'
import folderIcon from '../../../Assets/Images/folderIcon.png'
import PublicfolderIcon from '../../../Assets/Images/PublicfolderIcon.png'
import FolderSettings from './FolderSettings'

function Folder({ type, name , index , folderSettingsRef }) {

    const openFolderSetting=(e,index)=>{
        e.preventDefault(); 
        folderSettingsRef.current[index].style.display="flex"
    }   

    const closeFolderSetting=(index)=>{
        folderSettingsRef.current[index].style.display="none"
    } 
    

    return (
        <div className='w-[120px] h-auto rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2'   onContextMenu={(e)=>openFolderSetting(e,index)}  >
            <div className=' bg-green-00 center flex-col rounded-[4px] relative'>
                {type == "public"
                    ?
                    <img src={PublicfolderIcon} className='bg-red-00' />
                    :
                    <img src={folderIcon} className='bg-red-00' />
                }

                <span className='text-base bg-gray-00 max-w-[110px] px-2 h-auto inline-block text-center break-words'>

                    {name}

                </ span>

                {/* {name == "Node Js" ? */}
                    <div className='absolute top-[40%] left-[40%] z-20  hidden' ref={(element) => folderSettingsRef.current[index] = element}>
                        <FolderSettings closeFolderSetting={()=>closeFolderSetting(index)}/>
                    </div>
                    {/* : null}       */}
                          </div>

        </div>
    )
}

export default Folder
