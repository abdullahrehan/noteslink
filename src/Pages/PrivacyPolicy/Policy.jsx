import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import AppContext from "../../Context_Api/AppContext.js";
import { addDoc, collection } from 'firebase/firestore';
import { fdb } from '../../Firebase/firebaseConfig.js';

function Policy() {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(fdb, 'feedbacks'), {
            email: localStorage.getItem("userEmail").split('@')[0],
            name: state.name,
            date: Date.now(),
            subject: formData.subject,
            message: formData.message
        }).then(() => {
            console.log("Data Sent")
        }).catch((e) => {
            console.error(e)
        })


    };


    return (
        <div className='fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center '>

            <div className={`h-[92%]  w-[30%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}>


                <div className='pt-1 absolute -top-2 -right-8 hover:cursor-pointer' onClick={() => dispatch({ type: 'setShowPrivacyForm', setShowPrivacyFormAction: false })}>

                    <RxCross2 color='white' size={24} />

                </div>

                <div className="w-full h-full text-base overflow-y-scroll ">
                    <div className="container mx-auto p-4">
                        <div className='w-full center'>
                        <h1 className="text-2xl font-bold mb-4">Privacy Policy for Notes Link</h1>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                            <p className="text-gray-700 mb-4 text-base">
                                Welcome to Notes Link! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services, including our Mobile Application, Website, and Chrome Extension. By using Notes Link, you agree to the practices described in this Privacy Policy.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
                            <div className="pl-4">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium mb-1">Personal Information</h3>
                                    <p className="text-gray-600">
                                        We collect personal information that you provide to us when you create an account, such as your name, email address, and password. We also collect information about how you use our services, including the features you use and interaction data.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium mb-1">Device Information</h3>
                                    <p className="text-gray-600">
                                        We collect information about the devices you use to access Notes Link, including device type, operating system, and IP address.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium mb-1">Cookies and Tracking Technologies</h3>
                                    <p className="text-gray-600">
                                        We use cookies and similar tracking technologies to enhance your experience on Notes Link. Cookies help us understand how you use our services and personalize your experience.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
                            <p className="text-gray-700 mb-4">
                                We use your information to provide and improve our services, personalize your experience, communicate with you about your account, analyze usage patterns, and ensure the security of our services.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
                            <p className="text-gray-700 mb-4">
                                We do not share your personal information with third parties except with your consent, with service providers who assist us in operating our services, or as required by law.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Public Notes</h2>
                            <p className="text-gray-700 mb-4">
                                When you make notes public on Notes Link, the content of your public notes will be visible to other users. Other users can view, like, and save your public notes. You are responsible for ensuring that the content you make public does not violate any laws or the rights of others.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Security</h2>
                            <p className="text-gray-700 mb-4">
                                We take the security of your information seriously and implement measures to protect it from unauthorized access, disclosure, alteration, and destruction.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
                            <p className="text-gray-700 mb-4">
                                You have the following choices regarding your information: you can update or delete your personal information, choose to make your notes public or keep them private, and disable cookies through your browser settings.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Children’s Privacy</h2>
                            <p className="text-gray-700 mb-4">
                                Notes Link is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 mb-4">
                                We may update this Privacy Policy from time to time. Your continued use of Notes Link after the changes take effect constitutes your acceptance of the new Privacy Policy.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                            <div className="pl-4">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium mb-1">Address</h3>
                                    <p className="text-gray-600">
                                        1.5 Km Off Raiwind Road, Defense road Lahore, Punjab, Pakistan, 51000
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium mb-1">Support</h3>
                                    <p className="text-gray-600">support@noteslink.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Policy

