import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import tabFolderIcon from "../../../Assets/Images/tabFolderIcon.png";

function PathFolder({ name, children }) {
  return (
    <div>
      <div className='flex h-[30px] w-[200px] bg-#0002] flex items-center'>
        
        <div className='pl-1 pr-[2px]'>
          <IoIosArrowForward size={20}/>
        </div>
        <div>
          <img src={tabFolderIcon} className='w-[20px]' />
        </div>
        <div className='text-sm pl-2 hover:underline hover:underline-offset-1 hover:cursor-pointer'>
          {name}
        </div>
      </div>
      {children && (
        <ul>
          {children.map(child => (
            <li key={child.name}>
              <PathFolder name={child.name} children={child.children} />
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default PathFolder;
