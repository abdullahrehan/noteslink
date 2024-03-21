import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import PopUp from '../../Others/PopUp.jsx'
function LogOut({Function}) {
    const { state, dispatch } = useContext(AppContext)

    return (
        <PopUp title={"Log Out"} width='w-[350px]' height='h-[200px]' crossFunction={Function}>
                <div className={`flex flex-col justify-around items-center h-full w-[90%]`}>
                    <div className='flex flex-col gap-3'>
                        <div className='w- full text-lg '>
                            Are you sure to want to Logout your Account.
                        </div>
                    </div>
                    <div className='w- full center text-base font-medium'>
                        <button className='p-3 bg-red-400 hover:bg-[#2D2D2D] text-white rounded-[5px]' onClick={Function}>Log Out</button>
                    </div>
                </div>
        </PopUp>
    )
}

export default LogOut
