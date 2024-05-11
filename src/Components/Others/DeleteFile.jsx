import React from 'react'
import PopUp from '../../Components/Others/PopUp'

function DeleteFile({ type , Function}) {

    return (
        <div>
            <PopUp title={`Delete ${type} `} width='w-[350px]' height='h-[200px]' crossFunction={Function}>
                <div className={`flex flex-col justify-around items-center h-full w-[90%]`}>
                    <div className='flex flex-col gap-3'>
                        <div className='w- full text-lg '>
                            Are you sure to want to delete this {type}.
                        </div>
                    </div>
                    <div className='w- full center text-base font-medium'>
                        <button className='p-3 bg-red-400 hover:bg-[#2D2D2D] text-white rounded-[5px]' onClick={Function}>Delete {type}</button>
                    </div>
                </div>
            </PopUp>
        </div>
    )
}

export default DeleteFile
