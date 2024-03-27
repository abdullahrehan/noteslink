  import React from 'react'
  import Folder from './File_Folder_Structure/Folder'
  import MainFiles from './File_Folder_Structure/MainFiles'
  import FileLoader from '../Loaders/FileLoader'
  
  function AllFiles({data,homeFilesSettingRef}) {
  

    return (

      <div className='flex items-start gap-2'>
  
        {data.map((data, index) =>
  
          data.type == "folder" ?
        
          <Folder 
                visibility={data.visibility}
                name={data.name}
                index={index}
                homeFilesSettingRef={homeFilesSettingRef}
                />
  // <FileLoader/>  
          :

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
