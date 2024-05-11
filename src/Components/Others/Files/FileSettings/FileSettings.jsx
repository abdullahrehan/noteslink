import React from 'react'

function FileSettings({ settings , id , data, closeFileSettings }) {


    return (

        <div className='w-[220px] h-auto bg-[#F0F0F0] rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((Data, index) =>
                <React.Fragment key={index}>
                    <div className='flex z-20  h-[35px] w-[95%] gap-2 hover:bg-[#D9D9D9] rounded-[2px] flex items-center pl-2' onClick={()=>Data.Function(id,data)} >
                        <div className=''>{Data.Icon}</div>
                        <div className=''>{Data.name}</div>
                    </div>
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
                </React.Fragment>
            )}
            <div className='w-[100vw] z-10 h-[100vh] fixed top-0 left-0' onClick={closeFileSettings} onContextMenu={() => closeFileSettings()}></div>
        </div>
    )
}

export default FileSettings
