import React, { useState } from 'react'
import Settings from './HomeSettings'
import { PageSettingsList } from './PageSettingsList'

function PageSettings({ closeSetting }) {

    const [openView, setOpenView] = useState({ value: false, locationX: "right", locationY: "bottom" })
    const [openSortBy, setOpenSortBy] = useState({ value: false, locationX: "left", locationY: "bottom" })

    console.log(openView,openSortBy);
    return (
        <div className='relative flex w-[600px] bg-red-000 h-[240px]'>

            {/*45 or 123 bottom*/}
            {/* 0 or 420 left */}
            <div className='flex order-2 absolute left-0 bottom-[45px] w-[210px] h-auto bg-red-00'>
                {openSortBy.value ?
                    <Settings backSreen={false} settings={PageSettingsList[5].child} closeFolderSetting={closeSetting} />
                    : null}
            </div>

            <div className='flex order-1 absolute left-[212px]'>
                <Settings backSreen={true} settings={PageSettingsList} closeFolderSetting={closeSetting} openView={openView.value} viewFunction={(value) => setOpenView(value)} openSortBy={openSortBy.value} sortByFunction={(value) => setOpenSortBy(value)} />
            </div>
            {/* left 0 or 420 */}
            <div className='flex absolute left-[425px] top-[38px] w-[210px] h-auto bg-red-00'>
                {openView.value ?
                    <Settings backSreen={false} settings={PageSettingsList[1].child} closeFolderSetting={closeSetting} />
                    : null} 
            </div>
        </div>
    )
}

export default PageSettings
