import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from '../../../Context_Api/AppContext.js'
import PopUp from '../../Others/PopUp.jsx'
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from "react-router-dom";


function LogOut() {

    const { state, dispatch } = useContext(AppContext)
    const navigate = useNavigate();

    const accountLogout=()=>{
        localStorage.removeItem('userEmail');
        localStorage.setItem('isLogin', false);
        dispatch({ type: "setLogoutPopup", logoutPopupAction: false })
        Cookies.remove('userEmail');
        navigate("/auth")
        
    }

    return (
        <PopUp title={"Log Out"} width='w-[350px]' height='h-[200px]' crossFunction={()=>dispatch({ type: "setLogoutPopup", logoutPopupAction: false })}>
                <div className={`flex flex-col justify-around items-center h-full w-[90%]`}>
                    <div className='flex flex-col gap-3'>
                        <div className='w- full text-lg '>
                            Are you sure to want to Logout your Account.
                        </div>
                    </div>
                    <div className='w- full center text-base font-medium'>
                        <button className='p-3 bg-red-400 hover:bg-[#2D2D2D] text-white rounded-[5px]' onClick={accountLogout}>Log Out</button>
                    </div>
                </div>
        </PopUp>
    )
}

export default LogOut
