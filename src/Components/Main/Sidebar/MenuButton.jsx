import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function MenuButton({ name, icon, path, openMenu }) {

    const [showText, setShowText] = useState(false)

    useEffect(() => {
       if(openMenu){
        setTimeout(() => {
            setShowText(openMenu)
        }, 100);}
        else{
            setShowText(openMenu)

        }
    }, [openMenu])

    return (
        <div className={`hover:bg-[#0005]  hover:cursor-pointer  h-[40px] bg-[#0000] rounded-[3px] flex items-center ${openMenu ? "w-[90%]  pl-2" : "justify-center w-[80%]"}`}>
            {/* <div className={`hover:bg-[#0005] bg-red-300 hover:cursor-pointer w-[80%] h-[40px] bg-[#0000] rounded-[3px] center`}> */}
            <Link to={path}>
                <div className='flex items-center gap-2 '>
                    <div className=''> {icon} </div>
                    <div className={`${showText ? "flex" : "hidden"}  text-[#ababab] font-[system-ui] text-sm`}> {name} </div>
                </div>
            </Link>
        </div>
    )
}

export default MenuButton
