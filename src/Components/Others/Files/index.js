  import React, { useContext, useEffect, useRef } from 'react'
  import Folder from './File_Folder_Structure/Folder'
  import MainFiles from './File_Folder_Structure/MainFiles'
  import AppContext from '../../../Context_Api/AppContext.js'
  
  function AllFiles({data,homeFilesSettingRef}) {
  
    const {state,dispatch}=useContext(AppContext)

  
    return (
      <div className='flex items-start'>
  
        {data.map((data, index) =>
  
          data.type == "folder" ?
        
          <Folder 
                visibility={data.visibility}
                name={data.name}
                index={index}
                homeFilesSettingRef={homeFilesSettingRef}
                />
    
          :
        // null
          <MainFiles 
                content={data.content}
                visibility={data.visibility}
                name={data.name}
                index={index}
                homeFilesSettingRef={homeFilesSettingRef}
                />
        
        )}
  
      </div>
    )
  }
  
  export default AllFiles
