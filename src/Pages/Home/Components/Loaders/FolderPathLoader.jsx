import React from 'react'
function FolderPathLoader() {
  return (

    <div className='h-full text-sm bg-red-00 flex items-center justify-between ml-1 '>


        <div className='flex gap-1 text-gray-500 flex items-center'>

            <span className='underline underline-offset-1 hover:cursor-pointer bg-slate-300 rounded-full min-w-[90%] flex-wrap h-[15px] duration-100 transition-all delay-70 ease-in-out animate-pulse'></span>

            <span>/</span>

            <span className='underline underline-offset-1 hover:cursor-pointer bg-slate-300 rounded-full min-w-[90%] flex-wrap w-[30px] h-[15px] duration-100 transition-all delay-70 ease-in-out animate-pulse'></span>

            <span>/</span>

            <span className='underline underline-offset-1 hover:cursor-pointer bg-slate-300 rounded-full min-w-[90%] flex-wrap w-[30px] h-[15px] duration-100 transition-all delay-70 ease-in-out animate-pulse'></span>

            <span>/</span>

        </div>

        <div className='flex mr-2'>

            <div className='bg-red-200 w-[170px]'>

                <input type='text' className='bg-green-00 w-full outline-none  border-b-[2px]' placeholder='search '/>

            </div>

        </div>

    </div>
  )
}

export default FolderPathLoader
