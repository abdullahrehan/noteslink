import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../Context_Api/AppContext.js";
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { fdb } from "../../Firebase/firebaseConfig.js";

function Index() {
  const { state, dispatch } = useContext(AppContext);
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [uploading, setUploading] = useState(false);

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

  return (
    <div className="fixed z-40 top-0 left-0 w-[100vw] h-[100vh] bg-[#0009]  center ">
      <div
        className={`h-[92%]  w-[30%] bg-[#EAEAEA] relative rounded-[5px] relative  flex flex-col center`}
      >
        <div
          className="pt-1 absolute -top-2 -right-8 hover:cursor-pointer"
          onClick={() =>
            dispatch({
              type: "setShowAccountSettings",
              showAccountSettingsAction: false,
            })
          }
        >
          <RxCross2 color="white" size={24} />
        </div>

        <div className="w-full h-full text-base ">
          <div className="flex flex-row flex-wrap h-full">
            {/* First div */}
            <div className="flex flex-col justify-center items-center w-full h-1/10 ">
              <h2 className="underline text-2xl font-bold">Account Settings</h2>
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
                <div className="h-full center hover:cursor-pointer">
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
    </div>
  );
}

export default Index;
