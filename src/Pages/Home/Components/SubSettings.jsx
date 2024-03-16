import React from 'react'
import { IoIosArrowForward } from "react-icons/io";


function SubSettings({ settings }) {

    return (


        <div className='w-[210px] z-20 h-auto bg-[#F0F0F0] absolute rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((data, index) =>
                <>
                    <div key={index} className='flex z-20 h-[30px] w-[95%] hover:bg-[#D9D9D9] hover:cursor-pointer rounded-[2px] flex items-center pl-2' >
        
                        <div className='flex gap-2 w-[90%]'>
        
                            <div className=''>{data.Icon}</div>
        
                            <div className=''>{data.name}</div>
        
                        </div>
        
                        <div className='w-[10%]'>
                           
                            { data.child ? <IoIosArrowForward /> : null }

                        </div>

                    </div>
        
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
        
                </>
            )}

           
        </div>
    )
}


export default SubSettings
