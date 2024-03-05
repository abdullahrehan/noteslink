import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

function FileSettings({ backSreen, settings, closeFolderSetting, openView, viewFunction, openSortBy, sortByFunction }) {

    const openSetting = (data) => {
        console.log('asdasd', data);
        if (data.name == "View") {
            console.log('1');

            if (openView) {

                viewFunction({ value: false, locationX: "right", locationY: "bottom" })

            }

            else {

                sortByFunction({ value: false, locationX: "left", locationY: "bottom" })
                viewFunction({ value: true, locationX: "right", locationY: "bottom" })

            }
        }
        else if (data.name == "Sort By") {

            if (openSortBy) {
            
                sortByFunction({ value: false, locationX: "left", locationY: "bottom" })
            
            }
            
            else {
            
                viewFunction({ value: false, locationX: "right", locationY: "bottom" })
                sortByFunction({ value: true, locationX: "left", locationY: "bottom" })
            
            }
        }
    }

    const closeSetting = () => {
        viewFunction({ value: false, locationX: "right", locationY: "bottom" })
        sortByFunction({ value: false, locationX: "left", locationY: "bottom" })
        closeFolderSetting();

    }

    return (


        <div className='w-[210px] z-20 h-auto bg-[#F0F0F0] absolute rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((data, index) =>
                <>
                    <div className='flex z-20 h-[30px] w-[95%]  hover:bg-[#D9D9D9] hover:cursor-pointer rounded-[2px] flex items-center pl-2' onClick={() => openSetting(data)}>
                        <div className='flex gap-2 w-[90%]'>
                            <div className=''>{data.Icon}</div>
                            <div className=''>{data.name}</div>
                        </div>
                        <div className='w-[10%]'>
                            {data.child ?
                                <IoIosArrowForward />
                                : null
                            }
                        </div>

                    </div>
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
                </>
            )}
            <div className={`w-[100vw] z-10 ${backSreen ? " block" : "hidden"} h-[100vh] fixed top-0 left-0`} onClick={closeSetting} onContextMenu={closeSetting}></div>
        </div>
    )
}

export default FileSettings
