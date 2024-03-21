import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'

function NewFile() {

    const {state,dispatch}=useContext(AppContext)

    return (
    <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0007] center '>
    <div className={`h-[400px] w-[200px] bg-[#EAEAEA] rounded-[5px]  flex flex-col`}>
            {/* <div className={`w-[${width}px] h-[${height}px] bg-[#EAEAEA] rounded-[5px]  flex flex-col`}> */}
                <div className='flex justify-between px-2 pt-[1px] text-center'>
                    <div className=' '></div>
                    <div className='text-lg font-medium'>NEw</div>
                    <div className='pt-1 hover:cursor-pointer'onClick={() =>dispatch({ type: 'setAddNewTextfile', addNewTextfileAction:false})}><RxCross2 color='black' size={24} /></div>
                </div>
                <div className='w-[95%] h-full center flex flex-col'>
                    New File
                </div>
            </div>

    {/* </div> */}

</div>
  )
}

export default NewFile
