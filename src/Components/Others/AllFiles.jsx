import React, { useRef } from 'react'
import Folder from './Folder'
import MainFiles from './MainFiles'
import {HomeFiles} from '../Api/Api'

function AllFiles() {

  const folderSettingsRef = useRef([])

  return (
    <div className='flex items-start'>

      {HomeFiles.map((data, index) =>
        data.type == "folder" ?
          <Folder visibility={data.visibility} name={data.name} index={index} folderSettingsRef={folderSettingsRef} />
          :
          <MainFiles content={data.content} visibility={data.visibility} name={data.name} index={index} folderSettingsRef={folderSettingsRef} />
      )}

    </div>
  )
}

export default AllFiles
