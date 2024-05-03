 import React, { useContext } from 'react'
 import AppContext from "../../Context_Api/AppContext.js";

function FolderPath({folderdata}) {

    const { state, dispatch } = useContext(AppContext);

    function removeAfterIndex(arr, index) {
        if (index < 0 || index >= arr.length) {
          console.error('Invalid index');
          return arr; // return the original array if index is invalid
        }
        
        return arr.slice(0, index + 1); // return a new array containing elements up to the specified index
      }

    const setFolder=(data)=>{

        // if(data!=="My Computer"){
            const filteredIndex=state.homeFolderPath.findIndex((Data)=>Data==data)

            console.log(removeAfterIndex(state.homeFolderPath,filteredIndex),state.homeFolderPath);

            dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: data, data: folderdata } });
            dispatch({ type: "resetHomeFolderPath", homeFolderPathAction:  removeAfterIndex(state.homeFolderPath,filteredIndex)});
        // }

        
        
        // alert(data)
    }

    return (

    <div className='h-full w-full text-sm bg-red-00 flex items-center justify-between ml-1 '>

        <div className='flex gap-1 text-gray-500'>

        {state.homeFolderPath?.map(data=>
            <>
            <span className='underline underline-offset-1 hover:cursor-pointer' onClick={()=>setFolder(data)}>{data}</span>

            <span>/</span>
            </>
        )}
            
            {/* <span className='underline underline-offset-1 hover:cursor-pointer'>React</span>

            <span>/</span>

            <span className='underline underline-offset-1 hover:cursor-pointer'>Hooks</span>

            <span>/</span> */}

        </div>

        <div className='flex mr-2'>

            <div className='bg-red-200 w-[170px]'>

                <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search '/>

            </div>

        </div>

    </div>
    )
}

export default FolderPath
