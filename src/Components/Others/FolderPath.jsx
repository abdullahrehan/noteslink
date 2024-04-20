 import React, { useContext } from 'react'
 import AppContext from "../../Context_Api/AppContext.js";

function FolderPath({folderdata}) {

    const { state, dispatch } = useContext(AppContext);

    const setFolder=(data)=>{

        console.log(folderdata,data);
        // dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: data.name, data: data.data } });
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
