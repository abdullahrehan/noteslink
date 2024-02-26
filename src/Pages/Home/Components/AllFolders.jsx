import React, { useRef } from 'react'
import Folder from './Folder'

function AllFolders() {

  const foldersApi = [
    {
      name: "React Js",
      type: "private"
    },
    {
      name: "Node Js",
      type: "public"
    },
    {
      name: "Express Js",
      type: "private"
    },
    {
      name: "MongoDb",
      type: "public"
    },
    {
      name: "Redux",
      type: "private"
    },
  ]

  const folderSettingsRef = useRef([])
   
  // onMouseDown={()=>console.log(folderSettingsRef.current)}
  console.log(folderSettingsRef.current);
  return (
    <div className='flex'>
      {foldersApi.map((data,index) =>
        <Folder type={data.type} name={data.name} index={index} folderSettingsRef={folderSettingsRef} />
      )}
    
    </div>
  )
}

export default AllFolders
