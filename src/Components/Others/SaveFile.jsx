import React from 'react'
import PopUp from '../../Components/Others/PopUp'


function SaveFile({ type, Function }) {
    return (
        <PopUp title={`Save ${type} `} width='w-[350px]' height='h-[200px]' crossFunction={Function}>
            <div className={`flex flex-col justify-around items-start h-full w-[90%]`}>
                <div className='flex flex-row  gap-3'>
                    <input type='radio' />
                    <div className='w- full text-base '>
                        Save {type} in your Account
                    </div>
                </div>
                <div className='flex flex-row gap-3'>
                    <input type='radio' />

                    <div className='w- full text-base '>
                        Download {type} in your System
                    </div>
                </div>
                <div className='w-full center text-base font-medium'>
                    <button className='p-3 bg-red-400 hover:bg-[#2D2D2D] text-white rounded-[5px]' onClick={Function}>Proceed</button>
                </div>
            </div>
        </PopUp>
    )
}

export default SaveFile
