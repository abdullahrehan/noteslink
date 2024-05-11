import React from 'react'
import { RxCross2 } from "react-icons/rx";

function NavigationFolderPath() {

    const navigationFolderArray = [1, 2, 3, 4, 5]

    return (

        <div className='w-full  h-full flex flex-col relative overflow-hidden'>

            <div className='h-[95%] bg-red-00'>

                <div className='w-full bg-red-00 flex justify-between center pr-2'>

                    <div className='bg-slate-300 animate-pulse w-[110px] h-[30px] px-2 flex items-center gap-2 rounded-[5px] ml-2 mt-1 '>

                        <div className='bg-slate-400 animate-pulse w-[20px] h-[20px] rounded-full flex justify-center items-center '>

                        </div>


                        <div className='bg-slate-400 animate-pulse w-[80px] h-[12px] rounded-full flex justify-center items-center '>

                        </div>

                    </div>

                    <div className=' absolute  bg-red-00 right-[2px] top-[2px]'>

                    </div>

                </div>

                <div className='flex flex-col pl-8'>

                    {navigationFolderArray.map((data, index) =>
                        
                        <React.Fragment key={index}>
                           
                            <div className='bg-slate-300 animate-pulse w-[110px] h-[30px] px-2 flex items-center gap-2 rounded-[5px] ml-2 mt-2 '>

                                <div className='bg-slate-400 animate-pulse w-[20px] h-[20px] rounded-full flex justify-center items-center '>

                                </div>


                                <div className='bg-slate-400 animate-pulse w-[80px] h-[12px] rounded-full flex justify-center items-center '>

                                </div>

                            </div>
                       
                        </React.Fragment>
                        
                    )}

                </div>

            </div>

            <div className='h-[5%] px-2 py-1 flex text-sm font-medium justify-between items-end'>

                <div className='w-[80px] h-[15px] bg-slate-300 animate-pulse rounded-full'></div>

                <div className='w-[80px] h-[15px] bg-slate-300 animate-pulse rounded-full'></div>

            </div>

        </div>
    )
}

export default NavigationFolderPath
