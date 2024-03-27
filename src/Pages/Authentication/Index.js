import React from 'react'
import backgroundImage from '../../Assets/Images/background.png'

function Index({children}) {


    return (

    <div className='w-[100vw] h-[100vh]  bg-gray-200 center fixed top-0 left-0 '>

        <div className='w-full h-full absolute top-0 left-0 blur z-40 bg-[#0005]'>
            
            <img src={backgroundImage}/>

            <div className="absolute inset-0 bg-gradient-to-r from-black from-2%" />
       
        </div>

        <div className='w-[90%] h-[80%] bg-red-00 flex items-center justify-around z-50'>

            <div className='w-[50%] h-full bg-green-00 center order-1 '>
                
                <div className='w-[80%] h-full bg-blue-00 center '>

                    <div className='w-[350px] flex-col center h-auto bg-white rounded-[4px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'>

                    
                        {children}


                    </div>

                </div>
            
            </div>

            <div className='w-[50%] h-full bg-green-00 center order-0'>

                <div className='w-[400px] p-5 bg-red-00 flex flex-col gap-3 justify-between items-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>

                    <div className='w-full text-4xl font-bold'> 
                        
                        <div className='flex limelight-regular'>

                            <div className='text-white'>Notes </div>

                            <div className='text-[#F8BD0D]'>Link </div>

                        </div>

                    </div>

                    <div className='w-full text-2xl text-white jura-font py-2'> Helps You In Sharing Your Knowledge </div>

                    <div className='w-[80%] h-[1px] bg-white '> </div>

                </div>

            </div>

        </div>
        
        </div>
  )
}

export default Index
