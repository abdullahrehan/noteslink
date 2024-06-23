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
import { MdRefresh } from "react-icons/md";
import AppContext from '../../../Context_Api/AppContext.js'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

export const PageSettingsList=()=>{

  const {state,dispatch}=useContext(AppContext)
  const navigate = useNavigate();

return ([
  {
    name: "Go Back",
    Icon: <IoMdArrowRoundBack size={20} />,
    Function:()=>{
      navigate(-1);
      dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });
    },
  },
  {
    name: "Refresh",
    Icon: <MdRefresh size={20} />,
    Function:()=>{
      dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });
      dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });

    },
  },
  {
    name: "New",
    Icon: <RiAddFill size={20} />,
    Function:()=>{},

    child:[
      {name:"New File",Icon:<FaRegFileAlt size={18}/>,Function:()=>{dispatch({ type: 'setAddNewTextfile', addNewTextfileAction:true})}},
      {name:"New Folder",Icon:<FaRegFolderOpen size={18}/>,Function:()=>{dispatch({ type: 'setNewFolderNamePopup', newFolderNamePopupAction:true})}},
    
    ]  },
  {
    name: "Select All",
    Icon: <GrSelect size={20} />,
    Function:()=>{},

  },
  {
    name: "View",
    Icon: <MdOutlinePhotoSizeSelectLarge size={20} />,
    child:[
      {name:"Extra Large",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"Large",Icon:<IoIosRadioButtonOn size={16}/>},
      {name:"Small",Icon:<IoMdRadioButtonOff size={16}/>}
    
    ],
    Function:()=>{},

  },

  {
    name: "Sort By",
    Icon: <FaSort size={20} />,
    Function:()=>{},
    child:[
      {name:"Created Date",Icon:<IoIosRadioButtonOn size={16}/>},
      {name:"Last Update",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"A to Z",Icon:<IoMdRadioButtonOff size={16}/>},
      {name:"Z to A",Icon:<IoMdRadioButtonOff size={16}/>}
    
    ]  },

]
)
}