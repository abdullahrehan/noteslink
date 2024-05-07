import React from "react";
import Folder from "./File_Folder_Structure/Folder";
import MainFiles from "./File_Folder_Structure/MainFiles";
import FileLoader from "../../../Pages/Home/Components/Loaders/FileLoader";

function AllFiles({ data, homeFilesSettingRef, loading }) {
 
  const Array = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
 
  const sortByType = (a, b) => {
    if (a.type < b.type) return 1;
    if (a.type > b.type) return -1;
    return 0;
  };
 
  const dataArray = Array.sort(sortByType);
  // console.log(data);
  return (
    <div className="flex items-start gap-2 flex flex-wrap h-auto">
      {loading ? 
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
        
      )}
    </div>
  );
}

export default AllFiles;
