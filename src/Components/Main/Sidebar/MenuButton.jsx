import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";

function MenuButton({ name, icon, path, openMenu }) {

    const [showText, setShowText] = useState(false)
    
    useEffect(() => {
       
        if(openMenu){ setTimeout(() => { setShowText(openMenu) }, 100)}
       
        else{ setShowText(openMenu) }

    }, [openMenu])

    return (
        <div  className={`hover:bg-[#0005]  hover:cursor-pointer  h-[40px] bg-[#0000] rounded-[3px] flex items-center ${openMenu ? "w-[90%]   " : "justify-center w-[80%]"}`}>

            <NavLink  to={path}  className={({ isActive }) => isActive ? `bg-[#0005] w-full h-full ${openMenu ? null : "center"} flex font-bold rounded-[3px] pl-[2px]` : "pl-[2px]" } >  
            
                <div className='flex items-center gap-2 '>

                    <div className=''> {icon} </div>

                    <div className={`${showText ? "flex" : "hidden"}  text-[#ababab] font-[system-ui] text-sm`}> {name} </div>

                </div>
           
            </NavLink>
        
        </div>
    )
}

export default MenuButton
