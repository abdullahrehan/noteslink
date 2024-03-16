import { FaRegFolderOpen } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdFolderCopy } from "react-icons/md";

import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrSelect } from "react-icons/gr";
import { RiAddFill } from "react-icons/ri";
import { FaRegPaste } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
// import { FaRegFolderOpen } from "react-icons/fa";

export const PageSettingsList = [
  {
    name: "Go Back",
    Icon: <IoMdArrowRoundBack size={20} />,
  },
  {
    name: "View",
    Icon: <MdOutlinePhotoSizeSelectLarge size={20} />,
    child:[
      {name:"Extra Large",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"Large",Icon:<IoIosRadioButtonOn size={16}/>},
      {name:"Small",Icon:<IoMdRadioButtonOff size={16}/>}
    
    ]
  },
  {
    name: "Select All",
    Icon: <GrSelect size={20} />,
  },
  {
    name: "New",
    Icon: <RiAddFill size={20} />,
    child:[
      {name:"New File",Icon:<FaRegFileAlt size={18}/>},
      {name:"New Folder",Icon:<FaRegFolderOpen size={18}/>},
    
    ]  },
  
  {
    name: "Paste",
    Icon: <FaRegPaste size={20} />,
  },
  {
    name: "Sort By",
    Icon: <FaSort size={20} />,
    child:[
      {name:"Created Date",Icon:<IoIosRadioButtonOn size={16}/>},
      {name:"Last Update",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"A to Z",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"Z to A",Icon:<IoMdRadioButtonOff size={16}/>}
    
    ]  },

];

