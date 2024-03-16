import React from 'react'

function FileName() {
  return (
    <div className='w-[100vw] h-[100vh] bg-[#0009] z- absolute left-0 top-0 center'>
    <div className='w-[400px] h-[200px] bg-white rounded-[4px] flex flex-col justify-between items-center pb-5'>
        <div className='w-full flex justify-end pl-2 pt-0'>
            <RxCross2 size={25}/>
        </div>
        <div className='text-base px-10'>Enter File / Folder Name </div>
        <div className='text-base px-10'><input placeholder='Name'/> </div>
        <div className='px-10 flex gap-10'>
            <button className='bg-red-400 w-[100px] h-[45px] rounded-[4px] text-base font-medium'>Save</button>
        </div>
    </div>
</div>
  )
}

export default FileName
