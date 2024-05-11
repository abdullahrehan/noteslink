import React, { useContext, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import validator from 'validator';
import { auth } from '../../../Firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { fdb, rdb } from "../../../Firebase/firebaseConfig";
import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import AppContext from "../../../Context_Api/AppContext.js";
import Cookies from 'js-cookie';

function SignUp({ setSignUpSuccessfull }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState();
    const [showConfirmPassword, setShowConfirmPassword] = useState();
    const [showPassword, setShowPassword] = useState('');
    const [signUpErrors, setSignUpErrors] = useState(null);
    const { state, dispatch } = useContext(AppContext);

    const navigate = useNavigate();

    const errors = [
        "All Fields Are Mandatory",
        "Username is already takken",
        "Invalid Email",
        "Password must be 8 letter long",
        "Password do not match"
    ]


    const onInputChange = (event, setter) => { setter(event.target.value) }

    const onSignUp = () => {

        if (username.length == 0 || password.length == 0 || email.length == 0 || confirmPassword.length == 0) {

            setSignUpErrors(0);
        }

        else if (!validator.isEmail(email)) {

            setSignUpErrors(2);

        }

        else if (password.length < 8) {

            setSignUpErrors(3);

        }

        else if (confirmPassword !== password) {

            setSignUpErrors(4);

        }


        else {
            setSignUpErrors(null);
            createUserWithEmailAndPassword(auth, email, password).then(async () => {

                setSignUpSuccessfull(true)

                await setDoc(doc(fdb, "users", email), {
                    name: username,
                    emailAddress: email,
                    userType: "user",
                    tabs:{id: "", name: "My Computer"}
                }).then(() => {
                    Cookies.set('userEmail', JSON.stringify(email), { expires: 7 });
                    dispatch({ type: "setName", Name: username });
                    dispatch({ type: "setEmail", Email: email });
                    setSignUpSuccessfull(false)
                    navigate("/noteslink")

                }
                ).catch(err => console.log(err))
            }).catch((e) => { console.log(e) })
        }
    };

    return (

        <div className="w-[90%] pt-2">

            <div className="py-2">

                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => onInputChange(e, setUsername)}
                    required
                />

            </div>

            <div className="py-2">

                <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => onInputChange(e, setEmail)}
                    required
                />

            </div>

           

            <div className="py-2">


                <div className='bg-gray-50 h-full border flex border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>

                    <input
                        className="h-full bg-[#0000] w-[90%] outline-none"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => onInputChange(e, setConfirmPassword)}
                        type={showPassword ? "text" : "password"}
                        required
                    />

                    <div className='h-full w-[10%] hover:cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                            <GoEyeClosed size={20} />
                            :
                            <FiEye size={20} />
                        }
                    </div>

                </div>
            </div>

            <div className="py-2">
            
                <div className='bg-gray-50 h-full border flex border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>

                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-full bg-[#0000] w-[90%] outline-none"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => onInputChange(e, setPassword)}
                    required
                />

                <div className='h-full w-[10%] hover:cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ?
                        <GoEyeClosed size={20} />
                        :
                        <FiEye size={20} />
                    }
                </div>

                </div>

            </div>

            <div className={`flex gap-1 py-3 px-1 text-red-500 w-full text-sm ${signUpErrors !== null ? 'center' : 'hidden'}`}>

                <CiWarning color="red" /> {errors[signUpErrors]}

            </div>

            <div className="w-full center py-1 pb-4">

                <button className="px-5 py-3 bg-[#535353] rounded-[4px] text-white text-base hover:cursor-pointer hover:bg-[#2D2D2D]" onClick={onSignUp}>

                    SignUp

                </button>

            </div>

        </div>
    );
}

export default SignUp;
