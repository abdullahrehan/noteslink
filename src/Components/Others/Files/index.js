import React, { useRef } from 'react'
import Folder from './File_Folder_Structure/Folder'
import MainFiles from './File_Folder_Structure/MainFiles'

function AllFiles({data}) {

  const settingsRef = useRef([])

  return (
    <div className='flex items-start'>

      {data.map((data, index) =>

        data.type == "folder" ?
      
        <Folder 
              visibility={data.visibility}
              name={data.name}
              index={index}
              settingsRef={settingsRef}
              />
  
        :
      
        <MainFiles 
              content={data.content}
              visibility={data.visibility}
              name={data.name}
              index={index}
              settingsRef={settingsRef} 
              />
      
      )}

    </div>
  )
}

export default AllFiles
