import React, { useContext } from 'react'
import AppContext from "../../Context_Api/AppContext.js";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function FolderPath({ folderID, folderdata, searchFolder, setSearchFolder,searchFunction }) {

    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

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

    const onEnter=(e)=>{
        if(e.key=='Enter'||e.keyCode==13){
        searchFunction()
}
    }

    return (

        <div className='h-full w-full text-sm bg-red-00 flex items-center justify-between ml-1 '>

            <div className='flex gap-3'>

                <div className='w-auto bg-red-000 flex '>
                    <button className={`p-1 hover:bg-gray-200 hover:cursor-pointer  rounded-full center`} disabled={folderID===undefined?true:false} onClick={() => navigate(-1)}><IoIosArrowBack size={16} className={`${folderID===undefined?"text-gray-300":folderID===undefined?"text-gray-300":"black"}`}/></button>
                    <button className='p-1 hover:bg-gray-200 hover:cursor-pointer rounded-full center' onClick={() => navigate(1)}><IoIosArrowForward size={16}/></button>
                </div>
                
                <div className='flex gap-1 text-gray-500'>

                    {/* {state.homeFolderPath?.map((data, index) =>
                        <React.Fragment key={index}>
                            <span className='underline underline-offset-1 hover:cursor-pointer' onClick={() => setFolder(data)}>{data}</span>
                            <span>/</span>
                        </React.Fragment>
                    )} */}

                </div>
                
            </div>

            <div className='flex mr-2'>

                <div className='bg-red-200 w-[170px]'>

                    <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search ' value={searchFolder} onChange={(e) => setSearchFolder(e.target.value)} onKeyUp={(e)=>onEnter(e)}/>

                </div>

            </div>

        </div>
    )
}

export default FolderPath
