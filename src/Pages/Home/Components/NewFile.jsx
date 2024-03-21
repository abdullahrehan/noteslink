import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'

function NewFile() {

    const {state,dispatch}=useContext(AppContext)

    return (
    <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009] backdrop-blur-s center '>
    <div className={`h-[92%] w-[50%] bg-[#EAEAEA] rounded-[5px]  flex flex-col center`}>
                <div className='w-[95%] flex bg-red-00 flex justify-between px-2 pt-[1px] text-center'>
                    <div className=' '></div>
                    <div className='text-lg font-medium pt-2 center flex-col '>
                        <div className='pt-2 pb-1 font-medium text-2xl bg-red-00 center'>React Js</div>
                        <div className='h-[1px] w-[90%] bg-black  text-lg font-medium'></div>
                    </div>
                    <div className='pt-1 hover:cursor-pointer'onClick={() =>dispatch({ type: 'setAddNewTextfile', addNewTextfileAction:false})}><RxCross2 color='black' size={24} /></div>
                </div>
                <div className='w-[95%] h-full center flex flex-col'>
                    <div className='w-full h-full bg-red-200'>

                    </div>
                    <div className='w-full h-[150px] bg-green-200'>

                    </div>
                </div>
            </div>


</div>
  )
}

export default NewFile
