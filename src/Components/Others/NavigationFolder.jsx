import React, { useContext, useEffect, useState } from 'react'
import PathFolder from '../../Pages/Home/Components/PathFolder'
import Data from "../../Apis/Folder.json";
import { RxCross2 } from "react-icons/rx";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fdb } from '../../Firebase/firebaseConfig';
import AppContext from "../../Context_Api/AppContext.js";

function NavigationFolder({ closeFolders, folderName }) {

  const [HomeFolder, setHomeFolder] = useState([])
  const { state, dispatch } = useContext(AppContext);


  const homeFolderFunction = async () => {


    await getDocs(query(collection(fdb, "files"), where("owner", "==", localStorage.getItem("userEmail").split('@')[0].trim().toLowerCase()), where('type', '==', 'folder'), where("parent", "==", state.homeCurrentFoler.name == "My Computer" ? "" : state.homeFolderPath[state.homeFolderPath.length - 1])))
      .then((querySnapshot) => { setHomeFolder([]); querySnapshot.forEach((doc) => { setHomeFolder((prev) => [...prev, doc.data()]) }) })



  }

  useEffect(() => {
    homeFolderFunction()
  }, [state.refreshHomeData])

  console.log(HomeFolder)


  return (

    <div className='w-full  h-full flex flex-col relative overflow-hidden'>

      <div className='h-[95%] bg-red-00'>

        <div className='w-full bg-red-00 flex justify-between center pr-2'>

          {/* <PathFolder name={[{name:"Home",id:""}]} /> */}

          <div className=' absolute  bg-red-00 right-[2px] top-[2px]'>
            <RxCross2 size={20} className='hover:cursor-pointer ' color={"black"} onClick={closeFolders} />
          </div>
        </div>

        <div className='flex flex-col pl-2'>

          {HomeFolder.map((data, index) => 
          
          <PathFolder key={index} data={data} />
          // console.log(data.name)
          )}

        </div>

      </div>

      <div className='h-[5%] px-2 py-1 flex text-sm font-medium justify-between items-end'>

        <div>5 Folders</div>


      </div>

    </div>
  )
}

export default NavigationFolder
