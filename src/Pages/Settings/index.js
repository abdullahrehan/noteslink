import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../Context_Api/AppContext.js";
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { auth, fdb } from "../../Firebase/firebaseConfig.js";
import { IoIosArrowBack } from "react-icons/io";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

function Index() {
  const { state, dispatch } = useContext(AppContext);
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);

  const [password,setPassword]=useState()
  const [newPassword,setNewPassword]=useState()
  const [confirmNewPassword,setconfirmNewPassword]=useState()

  const [displayScreen,setDisplayScreen]=useState(0)

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageToCloudinary(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setUploading(true);

    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "noteslink"); // Replace with your upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/datashareapp/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      console.log(response.data.secure_url);

      await updateDoc(doc(fdb, "users", localStorage.getItem("userEmail")), {
        picture: response.data.secure_url,
      }).then(() => {
        setImage(response.data.secure_url);
      });
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const enterPassword=async()=>{
    console.log(password)
    await signInWithEmailAndPassword(auth, state.email, password).then(()=>{
      setDisplayScreen(2)
    }).catch(()=>{
      alert("Password Incorrect")
    });
  }

  const changePassword=()=>{

    console.log(newPassword,confirmNewPassword)
    const auth  = getAuth()
    const user = auth.currentUser
    console.log(user)
    if(newPassword===confirmNewPassword){
      updatePassword(user, newPassword).then(() => {
        alert("Password updated successfully");
        closeAccountSettings()
      }).catch((e)=>{
        console.error(e)
      })
    }
    else{
      alert("password is not same")
    }
    
  }

  const closeAccountSettings=()=>{
    setDisplayScreen(0)
    dispatch({type: "setShowAccountSettings",showAccountSettingsAction: false})
  }

  console.log(displayScreen)

  return (
    <>
      <div className="fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center ">
        <div
          className={`h-[92%] ${displayScreen==0?"center":"hidden"}  w-[30%] bg-[#EAEAEA] relative rounded-[5px] relative   flex-col  shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`}
        >
          <div className="pt-1 absolute -top-2 -right-8 hover:cursor-pointer" onClick={closeAccountSettings}>
            <RxCross2 color="white" size={24} />
          </div>

          <div className="w-full h-full text-base ">
            <div className="flex flex-row flex-wrap h-full">
              {/* First div */}
              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <h2 className="underline text-2xl font-bold">
                  Account Settings
                </h2>
              </div>

              {/* Second div */}
              <div className="flex flex-col justify-center items-center w-full h-3/10 ">
                <div className="rounded-full w-[250px]  h-[250px] rounded-full  overflow-hidden ">
                  <img
                    src={state.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Third div */}
              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <div className="flex w-[80%] flex-row gap-3 items-start">
                  <div className="font-semibold">Username :</div>
                  <div>abdullah12</div>
                </div>
              </div>

              {/* Fourth div */}
              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <div className="flex w-[80%] flex-row gap-3 items-start">
                  <div className="font-semibold">Email :</div>
                  <div>abdullahrehan8118@gmail.com</div>
                </div>
              </div>

              {/* Fifth div */}
              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <div className="flex w-[80%] flex-row gap-3 items-start">
                  <div className="font-semibold">Password :</div>
                  <div className="h-full center">******</div>
                  <div className="h-full center hover:cursor-pointer" onClick={()=>setDisplayScreen(1)}>
                    <MdModeEditOutline size={16} />
                  </div>
                </div>
              </div>

              {/* Sixth div */}
              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <div className="flex w-[80%] flex-row gap-3 items-start">
                  <div className="font-semibold">Public Files :</div>
                  <div>5</div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center w-full h-1/10 ">
                <button className="py-3 px-8 bg-[#2D2D2D] text-white rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-[32%] h-[37%] ${displayScreen==1?"flex":"hidden"}  rounded bg-[#EAEAEA] absolute  flex-col gap-2 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`}>
          <div className="w-full center text-2xl font-bold pb-2 pt-1 flex flex-row justify-between">
          <div className="w-[20%] pl-2 text-black hover:cursor-pointer" onClick={()=>setDisplayScreen(0)}><IoIosArrowBack color="black" size={24}/> </div>
            <div>Password Require</div>
            <div className="w-[20%] pr-2"></div>
          </div>


          <div className="w-full center text-lg pb-2">Please enter your password to change password</div>
          <div className="w-full center text-lg"><input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password" className="rounded w-[90%] h-[40px] px-2 outline-none" type="password"/></div>
          <div className="w-full center text-lg py-3"><button className="py-3 text-white px-6 rounded bg-gray-600" onClick={enterPassword}>Proceed</button></div>
        </div>

        <div className={`w-[32%] h-[42%] ${displayScreen==2?"flex":"hidden"}  rounded bg-[#EAEAEA] absolute flex-col gap-2 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`}>
          <div className="w-full center text-2xl font-bold pb-2 pt-1 flex flex-row justify-between">
            <div className="w-[10%] pr-2 text-black hover:cursor-pointer" onClick={()=>setDisplayScreen(1)}><IoIosArrowBack color="black" size={24}/> </div>
            <div>Change Password </div>
            <div className="w-[10%]">
            </div>
          </div>

          <div className="w-full center text-lg pb-2">
            Please enter new password 
          </div>
          <div className="w-full center text-lg">
            <input
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              placeholder="password"
              className="rounded w-[90%] h-[40px] px-2 outline-none"
              type="password"
            />
          </div>
          <div className="w-full center text-lg">
            <input
              value={confirmNewPassword}
              onChange={(e)=>setconfirmNewPassword(e.target.value)}
              placeholder="confirm password"
              className="rounded w-[90%] h-[40px] px-2 outline-none"
              type="password"
            />
          </div>
          <div className="w-full center text-lg py-3">
            <button className="py-3 text-white px-6 rounded bg-gray-600" onClick={changePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
