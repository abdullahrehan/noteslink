import React, { useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import validator from 'validator';

function SignUp() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signUpErrors, setSignUpErrors] = useState(null);

    const errors=[   
    "All Fields Are Mandatory",
    "Username is already takken",
    "Invalid Email",
    "Password must be 8 letter long",
    "Password do not match"
    ]
   

    const onInputChange = (event, setter) => { setter(event.target.value) }

    const onSignUp = () => {
        
        if (username.length == 0 || password.length== 0 || email.length== 0 || confirmPassword.length== 0) {

            setSignUpErrors(0);
        }
        
        else if (!validator.isEmail(email)) {

        setSignUpErrors(2);
        
        }
        
        else if(password.length < 8 ) {
        
            setSignUpErrors(3);
            
        }
        
        else if(confirmPassword!==password) {
    
            setSignUpErrors(4);
            
            }
        

        else {
            setSignUpErrors(null);
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
            
                <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => onInputChange(e, setPassword)}
                    required
                />
            
            </div>
            
            <div className="py-2">
            
                <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => onInputChange(e, setConfirmPassword)}
                    required
                />
            
            </div>
            
            <div className={`flex gap-1 py-3 px-1 text-red-500 w-full text-sm ${signUpErrors!==null ? 'center' : 'hidden'}`}>
            
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
