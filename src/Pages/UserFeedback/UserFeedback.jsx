import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from "../../Context_Api/AppContext.js";

function UserFeedback() {

    const { state, dispatch } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here
        console.log(formData);
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
                        <div className="w-full flex flex-col items-center ">
                            <label htmlFor="name" className="block text-base font-semibold w-[90%]">name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="name"
                                className="border border-gray-300 px-3 py-2 w-[90%] rounded h-[45px] text-base outline-none"
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col items-center ">
                            <label htmlFor="email" className="block text-base font-semibold w-[90%]">email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email"
                                className="border border-gray-300 px-3 py-2 w-[90%] rounded h-[45px] text-base outline-none"
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col items-center ">
                            <label htmlFor="subject" className="block text-base font-semibold w-[90%]">subject</label>
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
                        <div className="w-full flex flex-col items-center ">
                            <label htmlFor="message" className="block text-base font-semibold w-[90%]">message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="message"
                                className="border border-gray-300 px-3 py-2 w-[90%] h-[200px] rounded  text-base outline-none"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 mt-3 text-white py-2 px-4 rounded hover:bg-blue-600 block text-lg mx-auto">Send Feedback</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default UserFeedback

