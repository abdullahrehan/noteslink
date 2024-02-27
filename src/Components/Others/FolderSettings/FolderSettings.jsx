import React from 'react'

function FolderSettings({ settings, closeFolderSetting }) {

    return (

        <div className='w-[220px] z-20 h-auto bg-[#F0F0F0] rounded-[4px] gap-1 text-sm flex flex-col items-center p-1 pb-2'>

            {settings.map((data, index) =>
                <>
                    <div className='flex z-20 h-[35px] w-[95%] gap-2 hover:bg-[#D9D9D9] rounded-[2px] flex items-center pl-2' >
                        <div className=''>{data.Icon}</div>
                        <div className=''>{data.name}</div>
                    </div>
                    <div className='w-[95%] bg-gray-400 h-[1px]'></div>
                </>
            )}
            <div className='w-[100vw] z-10 h-[100vh] fixed top-0 left-0' onClick={closeFolderSetting} onContextMenu={() => closeFolderSetting()}></div>
        </div>
    )
}

export default FolderSettings
