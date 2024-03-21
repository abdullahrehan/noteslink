import { FaRegFolderOpen } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdFolderCopy } from "react-icons/md";
import AppContext from '../../../../Context_Api/AppContext.js'
import { useContext } from "react";




export const FolderSettingsData =()=>{
  const {state,dispatch}=useContext(AppContext)
return [
  {
    name: "Open Folder",
    Icon: <FaRegFolderOpen size={20} />,
    Function: () =>{}
  },
  {
    name: "Make Folder Public",
    Icon: <BsPeople size={20} />,
    Function: () =>{}
  },
  {
    name: "Add in Tabs",
    Icon: <IoIosAdd size={20} />,
    Function: () =>{}
  },
  {
    name: "Move Folder",
    Icon: <MdOutlineDriveFileMove size={20} />,
    Function: () =>{}
  },
  {
    name: "Copy Folder",
    Icon: <MdFolderCopy size={20} />,
    Function: () =>{}
  },
  {
    name: "Rename Folder",
    Icon: <MdOutlineDriveFileRenameOutline size={20} />,
    Function: () =>{dispatch({ type: 'setRenameFolderPopup', renameFolderPopupAction:true})}
  },
  {
    name: "Delete Folder",
    Icon: <MdDeleteOutline size={20} />,
    Function: () =>{dispatch({ type: 'setDeletFilePopup', deletFilePopupAction:true})}
  },
]}

export const FileSettingsData = ()=>{
  const {state,dispatch}=useContext(AppContext)

return  [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: () =>{}
    },
    {
      name: "Make File Public",
      Icon: <BsPeople size={20} />,
      Function: () =>{}
    },
    {
      name: "Move File",
      Icon: <MdOutlineDriveFileMove size={20} />,
      Function: () =>{}
    },
    {
      name: "Copy File",
      Icon: <MdFolderCopy size={20} />,
      Function: () =>{}
    },
    {
      name: "Rename File",
      Icon: <MdOutlineDriveFileRenameOutline size={20} />,
      Function: () =>{
        dispatch({ type: 'setRenameFilePopup', renameFilePopupAction:true})
      }
    },
    {
      name: "Delete File",
      Icon: <MdDeleteOutline size={20} />,
      Function: () =>{}
    },
  ]}
