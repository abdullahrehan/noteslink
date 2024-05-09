import React, { useContext } from "react";
import Folder from "./File_Folder_Structure/Folder";
import MainFiles from "./File_Folder_Structure/MainFiles";
import FileLoader from "../../../Pages/Home/Components/Loaders/FileLoader";
import AppContext from "../../../Context_Api/AppContext.js";
import NotesVector from '../../../Assets/Images/Notes.gif'

function AllFiles({ data, homeFilesSettingRef, loading }) {
 
  const { state, dispatch } = useContext(AppContext);

  const Array = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
 
  const sortByType = (a, b) => {
    if (a.type < b.type) return 1;
    if (a.type > b.type) return -1;
    return 0;
  };
 
  const dataArray = Array.sort(sortByType);
  // console.log(data);
  return (
    <div className="flex w-full items-start gap-2 flex flex-wrap h-auto">
      {state.homeCurrentFoler.data.length!==0 ? 
      
      loading ? 
            <FileLoader />
            :
            dataArray.map((data, index) =>
        data.type == "folder" ? 
        
          
          
            <Folder
              id={data.id}
              visibility={data.status}
              data={data}
              name={data.name}
              index={index}
              homeFilesSettingRef={homeFilesSettingRef}
            />
          
        
        // null: 
        
        :
        // null
          <MainFiles
            id={data.id}
            visibility={data.status}
            content={data.content}
            data={data}
            name={data.name}
            index={index}
            homeFilesSettingRef={homeFilesSettingRef}
          />

          
        
      ):
      null
      // <div className={`h-full w-full flex flex-col w-full center`}>
        
      //     <img src={NotesVector} className="h-[80%]"/>
        
      //     <div className="font-bold text-gray-500 text-2xl">This Folder Is Empty</div>
          
      //   </div>
      }
    </div>
  );
}

export default AllFiles;
