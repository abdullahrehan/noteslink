import { FaRegFolderOpen } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdFolderCopy } from "react-icons/md";

export const HomeFiles = [
  {
    name: "React Js",
    visibility: "private",
    type: "folder",
    content: null,
  },
  {
    name: "Node Js",
    visibility: "public",
    type: "folder",
    content: null,
  },
  {
    name: "Express Js",
    visibility: "private",
    type: "folder",
    content: null,
  },
  {
    name: "MongoDb",
    visibility: "public",
    type: "folder",
    content: null,
  },
  {
    name: "Redux",
    visibility: "private",
    type: "file",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus accusamus harum expedita et magnam eius minus itaque quam sit qui adipisci architecto, atque porro quasi. Voluptatem maiores aut corrupti quaerat.",
  },
  {
    name: "Event Loop",
    visibility: "public",
    type: "file",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus accusamus harum expedita et magnam eius minus itaque quam sit qui adipisci architecto, atque porro quasi. Voluptatem maiores aut corrupti quaerat.",
  },
];

export const FolderSettingsData = [
  {
    name: "Open Folder",
    Icon: <FaRegFolderOpen size={20} />,
  },
  {
    name: "Make Folder Public",
    Icon: <BsPeople size={20} />,
  },
  {
    name: "Add in Tabs",
    Icon: <IoIosAdd size={20} />,
  },
  {
    name: "Move Folder",
    Icon: <MdOutlineDriveFileMove size={20} />,
  },
  {
    name: "Copy Folder",
    Icon: <MdFolderCopy size={20} />,
  },
  {
    name: "Rename Folder",
    Icon: <MdOutlineDriveFileRenameOutline size={20} />,
  },
  {
    name: "Delete Folder",
    Icon: <MdDeleteOutline size={20} />,
  },
];

export const FileSettingsData = [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
    },
    {
      name: "Make File Public",
      Icon: <BsPeople size={20} />,
    },
    {
      name: "Move File",
      Icon: <MdOutlineDriveFileMove size={20} />,
    },
    {
      name: "Copy File",
      Icon: <MdFolderCopy size={20} />,
    },
    {
      name: "Rename File",
      Icon: <MdOutlineDriveFileRenameOutline size={20} />,
    },
    {
      name: "Delete File",
      Icon: <MdDeleteOutline size={20} />,
    },
  ];
