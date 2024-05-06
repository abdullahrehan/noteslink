import React from 'react'
import { RxCross2 } from "react-icons/rx";

function OpenReport({setOpenReportFile,fileName,fileContent}) {

  return (
    <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[65%]  w-[50%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={setOpenReportFile}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className='w-[95%] h-[70px] flex bg-red-00 flex justify-between  text-center'>

                    <div className='w-[33%] text-lg font-medium justify-center items-start flex-col '>

                        <div className='flex '>
                            <div className=' h-full '></div>
                            <div className='pt-2 pb-1 h-[40px] w-auto font-medium text-2xl bg-[#0000] outline-none text-center center'  >{fileName}</div>
                        </div>


                    </div>
                    <div></div>

                    <div></div>
                </div>

                <div className='w-[95%] h-full  items-center flex flex-col'>

                    <div className={`w-full relative h-[96%] mt-1 relative overflow-hidden  bg-red-00 shadow-[inset_-12px_-8px_40px_#46464620] overflow-none`} >

                        <div className='bg-[#0000] w-full h-[100%] overflow-y-auto scroll-style text-sm p-2 outline-none' spellCheck={false} style={{ resize: 'none' }}>{fileContent}</div>


                    </div>

          
                </div>

          
            </div>

        </div>
  )
}

export default OpenReport
