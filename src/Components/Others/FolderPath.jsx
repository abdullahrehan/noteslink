import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../../Context_Api/AppContext.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function FolderPath({ folderID, folderdata, searchFolder, setSearchFolder,searchFunction }) {

    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const [folderName,setFolderName]=useState("My Computer")

    // console.log(folderdata[0],'folderdata')

    const removeAfterIndex = (arr, index) => {

        if (index < 0 || index >= arr.length) { return arr }
        return arr.slice(0, index + 1);

    }

    const setFolder = (data) => {

        const filteredIndex = state.homeFolderPath.findIndex((Data) => Data == data)
        dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: data, data: folderdata } });
        dispatch({ type: "resetHomeFolderPath", homeFolderPathAction: removeAfterIndex(state.homeFolderPath, filteredIndex) });
    }

//     const onEnter=(e)=>{
//         if(e.key=='Enter'||e.keyCode==13){
//         searchFunction()
// }
//     }

    const goBack=()=>{
        navigate(-1)
        dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });

    }

    
    const goForward=()=>{
        navigate(1)
        dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });
    }

    useState(()=>{



        setFolderName()

    },[folderID])

    useEffect(()=>{
        searchFunction()
    },[searchFolder])

    return (

        <div className='h-full w-full text-sm bg-red-00 flex items-center justify-between ml-1 '>

            <div className='flex w-[170px] gap-3'>

                <div className='w-auto bg-red-000 flex '>
                    <button className={`p-1 hover:bg-gray-200 hover:cursor-pointer  rounded-full center`} disabled={folderID===undefined?true:false} onClick={goBack}><IoIosArrowBack size={16} className={`${folderID===undefined?"text-gray-300":folderID===undefined?"text-gray-300":"black"}`}/></button>
                    <button className='p-1 hover:bg-gray-200 hover:cursor-pointer rounded-full center' onClick={goForward}><IoIosArrowForward size={16}/></button>
                </div>
                
            </div>

            <div className='flex gap-1 center text-lg font-bold text-black text-gray-500 w-full-minus-170 h-full '>

                {folderName==""?"My Computer":folderName}
                   
            </div>

            <div className='flex mr-2 w-[170px]'>

                <div className='bg-red-200 w-full'>

                    <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search ' value={searchFolder} onChange={(e) => setSearchFolder(e.target.value)} />

                </div>

            </div>

        </div>
    )
}

export default FolderPath
