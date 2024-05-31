import React from 'react'
import { IoIosArrowForward } from "react-icons/io";


function FileSettings({ settings, openView, viewFunction, openSortBy, sortByFunction ,openNewFiles ,newFilesFunction }) {

    const openSetting = (e,data) => {

        // console.log("hello")
        const viewFilesConditions=data.name === "View" ? !openView ? true : false : false;
        const sortByConditions=data.name === "Sort By" ? !openSortBy ? true : false : false;
        const newFilesConditions=data.name === "New" ? !openNewFiles ? true : false : false;
        e.stopPropagation()

        // data.Function()
        // viewFunction(viewFilesConditions)
        // sortByFunction(sortByConditions)
        newFilesFunction(newFilesConditions)

    }

    const closeSubSettings=()=>{

        viewFunction(false)
        sortByFunction(false)
        newFilesFunction(false)
        
    }

    return (

        <div className='w-[210px] z-20 h-auto bg-[#F0F0F0] absolute rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((data, index) =>

                <React.Fragment key={index}>

                    <div className='flex z-20 w-[95%] h-[30px] bg-red-00  hover:bg-[#D9D9D9] hover:cursor-pointer rounded-[2px] flex items-center pl-2' onClick={(e) => openSetting(e,data)} onMouseEnter={closeSubSettings} >

                        <div className='flex gap-2 w-[90%]'>

                            <div className=''>{data.Icon}</div>

                            <div className=''>{data.name}</div>

                        </div>

                        <div className='w-[10%]'>

                            { data.child ? <IoIosArrowForward /> : null }

                        </div>

                    </div>
                    
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
                </React.Fragment>
            )}
        </div>
    )
}

export default FileSettings

