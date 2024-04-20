import React, { useEffect, useRef, useState } from "react";
import { HomeFiles } from "../../Apis/Api.js";
import folderIcon from "../../Assets/Images/folderIcon.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fdb, rdb } from "../../Firebase/firebaseConfig.js";
import Folder from '../../Components/Others/Files/File_Folder_Structure/Folder.jsx'
import MainFiles from '../../Components/Others/Files/File_Folder_Structure/MainFiles.jsx'
import { IoIosSearch } from "react-icons/io";
import search_file_vector from '../../Assets/Images/search_file_vector.png'
import file_loader from '../../Assets/Images/loader.gif'
import error from '../../Assets/Images/error.jpg'
import { RxCross2 } from "react-icons/rx";

function Index() {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [showSearchVector, setShowSearchVector] = useState(true);
  const [loading, setloading] = useState(false);
  const [serverError,setServerError]=useState(false);
  
  const homeFilesSettingRef=useRef([])

  const search = async () => {

    setShowSearchVector(false)
    setloading(true)
    
    setData([])
    const q = await getDocs(
      query(
        collection(fdb, "files"), 
        where("keywords", "array-contains", searchQuery.trim().toLowerCase()),
        where("status", "==", "public")
      )
    )
      .then((querySnapshot) => {
        setData([])
        querySnapshot.forEach((doc) => {
          setData((prev) => [...prev, doc.data()]);
          // return null
        });
      
      })
      .then(()=>{
          
          setloading(false)

      })
      
      .catch((e) => console.log(e));
  };

  useEffect(()=>{

    if(searchQuery!=""){
      if(data.length==0){
        setServerError(true)
      }
      else{
        setServerError(false)
      }
    }

  },[data])
  const removeSearch=()=>{
    setData([])
    setSearchQuery("")
    setShowSearchVector(true)
  }

  return (
    <div className="w-full h-full bg-green-00 font-medium ">
      <div className="w-full h-[50px] py-0 bg-red-00 center ">
        <div className="w-[500px] h-[45px] flex items-center bg-[#0002] rounded-full ">
          <input
            className="w-[90%] h-full bg-[#0000] px-4 outline-none font-normal"
            placeholder="Search the file "
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button className="border-gray-400 border-r-[1px] pr-2 h-[60%]" onClick={removeSearch}>
            <RxCross2 size={22} className="text-gray-400 hover:text-black hover:cursor-pinter"/>
          </button>
          <button
            className=" w-[10%] h-full center hover:bg-[#0001] rounded-r-full"
            onClick={search}
          >
            <IoIosSearch size={25}/>
          </button>
        </div>
      </div>

      <div className={`flex ${showSearchVector || loading  || serverError ? "h-minus-50px" : "h-auto"}`}>

        {
        showSearchVector ?
        
        <div className="w-full h-full center flex flex-col gap-5"> 
        <img src={search_file_vector} className="w-[40%]"/>
        <div className="text-2xl text-gray-400 font-mono">Search Public Files Here</div>  
        </div>
      : 
       loading  ?
      <div className="w-full h-full center flex flex-col gap-5"> 
      <img src={file_loader} className="w-[50px]"/>
      </div>

      : serverError ?

      <div className="w-full h-full center flex flex-col gap-5"> 
      <img src={error} className="w-[40%]"/>
        </div>  
      :  

        data.map((data,index) => (
       
       <div className="w-[120px]  rounded-[4px] hover:cursor-pointer hover:bg-gray-200 py-2">
       
            <div className=" bg-green-00 center flex rounded-[4px] relative">

             {data.type=="folder" ?
              
             <Folder 
             visibility={data.status}
             name={data.name}
             data={data}

             index={index}
             homeFilesSettingRef={homeFilesSettingRef}
             page={"search files"}

             />
             
             :
             
             <MainFiles 
                content={data.content}
                visibility={data.status}
                name={data.name}
                index={index}
                data={data}

                homeFilesSettingRef={homeFilesSettingRef}
                page={"search files"}

                />
              

            
            }
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
