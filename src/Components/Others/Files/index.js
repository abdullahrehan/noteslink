import React, { useContext } from "react";
import Folder from "./File_Folder_Structure/Folder";
import MainFiles from "./File_Folder_Structure/MainFiles";
import FileLoader from "../../../Pages/Home/Components/Loaders/FileLoader";
import AppContext from "../../../Context_Api/AppContext.js";

function AllFiles({ page, data, homeFilesSettingRef }) {
 
  const { state, dispatch } = useContext(AppContext);

  
  const sortByType = (a, b) => {
    if (a.type < b.type) return 1;
    if (a.type > b.type) return -1;
    return 0;
  };
 
  const Array = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  const dataArray = Array.sort(sortByType);
 
  return (
    <div className="flex w-full items-start gap-2 flex flex-wrap h-auto content-start">
     
      {state.homeCurrentFoler.data.length!==0 ? 
      
       state.loadHomeFiles || state.refreshHomeData ? 
            
        <FileLoader />
      
        :
      
        dataArray.map((data, index) =>
          
          <React.Fragment key={index}>
            {
          data.type == "folder" ? 
          
          <Folder
              page={page}
              id={data.id}
              visibility={data.status}
              data={data}
              name={data.name}
              index={index}
              homeFilesSettingRef={homeFilesSettingRef}
            />
        :
          <MainFiles
            page={page}
            id={data.id}
            visibility={data.status}
            content={data.content}
            data={data}
            name={data.name}
            index={index}
            homeFilesSettingRef={homeFilesSettingRef}
          />
            }
        </React.Fragment>
      
        ):

      null
     
      }
    </div>
  );
}

export default AllFiles;
