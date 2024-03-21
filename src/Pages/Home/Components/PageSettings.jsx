import React, { useContext, useEffect, useState } from 'react'
import Settings from './HomeSettings'
import SubSettings from './SubSettings'
import { PageSettingsList } from './PageSettingsList'
import AppContext from '../../../Context_Api/AppContext.js'

function PageSettings({ closeSetting, menuDimension }) {

    const { state, dispatch } = useContext(AppContext)
    const { openHomeSetings } = state
    const [openView, setOpenView] = useState(false)
    const [openSortBy, setOpenSortBy] = useState(false)
    const [openNewFiles, setOpenNewFiles] = useState(false)

    useEffect(()=>{
    if (!openHomeSetings) {

        setOpenView(false)
        setOpenSortBy(false)
        setOpenNewFiles(false)
    }
},[openHomeSetings])

    return (

        <div className='relative flex w-[650px] bg-red-000 h-[240px]'>


            {openNewFiles || openView || openSortBy ?

                <div className={`z-20 flex ${menuDimension.horizontal == "right" ? "left-[424px]" : menuDimension.horizontal == "left" ? "left-[0px]" : null} absolute ${menuDimension.vertical == "top" ? "bottom-[123px]" : menuDimension.vertical == "bottom" ? "bottom-[162px]" : null}  ${openNewFiles ? "top-[38px]" : openView ? "top-[115px]" : null}  w-[210px] h-auto bg-red-00`}>

                    <SubSettings settings={PageSettingsList()[openView ? 3 : openNewFiles ? 1 : openSortBy ? 5 : null].child} />

                </div>

                : null}

            <div className='flex order-1 absolute left-[212px]'>

                <Settings
                    settings={PageSettingsList()}
                    openView={openView}
                    viewFunction={(value) => setOpenView(value)}
                    openSortBy={openSortBy}
                    sortByFunction={(value) => setOpenSortBy(value)}
                    openNewFiles={openNewFiles}
                    newFilesFunction={(value) => setOpenNewFiles(value)}
                />

            </div>

            <div className={`w-[100vw] z-0 h-[100vh] fixed top-0 left-0`} onClick={closeSetting} ></div>


        </div>
    )
}

export default PageSettings
