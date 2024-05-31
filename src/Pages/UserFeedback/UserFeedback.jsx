import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from "../../Context_Api/AppContext.js";
import { addDoc, collection } from 'firebase/firestore';
import { fdb } from '../../Firebase/firebaseConfig.js';

function UserFeedback() {

    const { state, dispatch } = useContext(AppContext)
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
    });
    const email = localStorage.getItem('userEmail').split('@')[0].trim()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addDoc(collection(fdb, 'feedbacks'),{
            email: localStorage.getItem("userEmail").split('@')[0],
            name: state.name,
            date: Date.now(),
            subject: formData.subject,
            message: formData.message
        }).then(()=> {
            console.log("Data Sent")
        }).catch((e) => {
            console.error(e)
        })
        
        console.log(state.name);
    };


    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[30%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={()=>dispatch({ type: 'setShowFeedbackForm', showFeedbackFormAction:false})}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className="w-[90%] h-full pt-2">
                    <div className="text-3xl font-semibold mb-4 w-full center">Feedback Form</div>
                   
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 items-center">
                    
                        <div className="w-full flex flex-col items-center gap-1">
                            <label htmlFor="subject" className="block text-base font-semibold w-[90%]">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="subject"
                                className="border border-gray-300 px-3 py-2 w-[90%] rounded h-[45px] text-base outline-none"
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col items-center gap-1">
                            <label htmlFor="message" className="block text-base font-semibold w-[90%]">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="message"
                                className="border border-gray-300 px-3 py-2 w-[90%] h-[320px] rounded  text-base outline-none"
                                required
                            ></textarea>
                        </div>
                        <div className='w-full h-full center'>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 block text-lg mx-auto">Send Feedback</button>
                        </div>   
                    </form>
                </div>

            </div>

        </div>
    )
}

export default UserFeedback

