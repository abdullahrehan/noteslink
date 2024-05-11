 import React, { useContext } from 'react'
 import AppContext from "../../Context_Api/AppContext.js";

function FolderPath({folderdata,searchFolder,setSearchFolder}) {

    const { state, dispatch } = useContext(AppContext);

    const removeAfterIndex=(arr, index)=> {

        if (index < 0 || index >= arr.length) { return arr }
        return arr.slice(0, index + 1); 
      
    }

    const setFolder=(data)=>{

        const filteredIndex=state.homeFolderPath.findIndex((Data)=>Data==data)
        dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: data, data: folderdata } });
        dispatch({ type: "resetHomeFolderPath", homeFolderPathAction:  removeAfterIndex(state.homeFolderPath,filteredIndex)});
    }

    return (

    <div className='h-full w-full text-sm bg-red-00 flex items-center justify-between ml-1 '>

        <div className='flex gap-1 text-gray-500'>

            {state.homeFolderPath?.map((data,index)=>
                <React.Fragment key={index}>
                    <span className='underline underline-offset-1 hover:cursor-pointer' onClick={()=>setFolder(data)}>{data}</span>
                    <span>/</span>
                </React.Fragment>
            )}

        </div>

        <div className='flex mr-2'>

            <div className='bg-red-200 w-[170px]'>

                <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search ' value={searchFolder} onChange={(e)=>setSearchFolder(e.target.value)}/>

            </div>

        </div>

    </div>
    )
}

export default FolderPath
