import { FaRegFolderOpen } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdFolderCopy } from "react-icons/md";
import AppContext from "../../../../Context_Api/AppContext.js";
import { useContext } from "react";
import {
  FieldValue,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fdb } from "../../../../Firebase/firebaseConfig.js";

export const FolderSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);
  return [
    {
      name: "Open Folder",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, Data) => {
        let newArray = [];
        console.log(Data);
        const q = await getDocs(
          query(collection(fdb, "files"), where("parent", "==", id))
        )
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              newArray.push(doc.data());
            });

            Promise.all(newArray).then((data) => {
              dispatch({
                type: "setHomeCurrentFoler",
                openHomeSetingsAction: { name: Data.name, data: data },
              });
              dispatch({
                type: "setHomeFolderPath",
                homeFolderPathAction: Data.name,
              });
              dispatch({ type: "setRefreshData", refreshDataAction: true });
            });
          })
          .catch((e) => console.log(e));
      },
    },
    {
      name: `Make Folder Public`,
      Icon: <BsPeople size={20} />,
      Function: async (id, Data) => {
        if (window.confirm("Are you sure you want to make the folder public")) {
          console.log(id, Data);
          updateDoc(doc(fdb, "files", id), {
            status: Data.status === "public" ? "private" : "public",
          }).then(() => {
            dispatch({ type: "setRefreshData", refreshDataAction: true });
          });
        }
      },
    },
    {
      name: "Add in Tabs",
      Icon: <IoIosAdd size={20} />,
      Function: async (id, Data) => {
        await updateDoc(doc(fdb, "users", state.email.trim()), {
          tabs: arrayUnion({ id: Data.id, name: Data.name }),
        })
          .then(() => {})
          .catch((e) => {
            console.error(e);
          });
      },
    },
    {
      name: "Move Folder",
      Icon: <MdOutlineDriveFileMove size={20} />,
      Function: () => {},
    },
    {
      name: "Copy Folder",
      Icon: <MdFolderCopy size={20} />,
      Function: () => {},
    },
    {
      name: "Rename Folder",
      Icon: <MdOutlineDriveFileRenameOutline size={20} />,
      Function: (id) => {
        dispatch({
          type: "setRenameFolderPopup",
          renameFolderPopupAction: { value: true, id: id },
        });
      },
    },
    {
      name: "Delete Folder",
      Icon: <MdDeleteOutline size={20} />,
      Function: () => {
        dispatch({ type: "setDeletFilePopup", deletFilePopupAction: true });
      },
    },
  ];
};

export const publicFolderSettingsData = () => {
  // const { state, dispatch } = useContext(AppContext);
  return [
    {
      name: "Open Folder",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, Data) => {
        let newArray = [];
        console.log("Here ===============> ", Data.name);

        const q = await getDocs(
          query(collection(fdb, "files"), where("parent", "==", id))
        )
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              newArray.push(doc.data());
            });

            // Promise.all(newArray).then((data) => {
            //   dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: Data.name, data: data } });
            //   dispatch({ type: "setHomeFolderPath", homeFolderPathAction: Data.name });

            // });
          })
          .catch((e) => console.log(e));
      },
    },
    {
      name: "Make Folder Private",
      Icon: <BsPeople size={20} />,
      Function: () => {},
    },
  ];
};

export const publicFileSettingsData = () => {
  // const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, Data) => {
        let newArray = [];
        console.log("Here ===============> ", Data.name);

        const q = await getDocs(
          query(collection(fdb, "files"), where("parent", "==", id))
        )
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              newArray.push(doc.data());
            });

            // Promise.all(newArray).then((data) => {
            //   dispatch({ type: "setHomeCurrentFoler", openHomeSetingsAction: { name: Data.name, data: data } });
            //   dispatch({ type: "setHomeFolderPath", homeFolderPathAction: Data.name });

            // });
          })
          .catch((e) => console.log(e));
      },
    },
    {
      name: "Make File Private",
      Icon: <BsPeople size={20} />,
      Function: () => {},
    },
  ];
};

export const SavedFolderSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);
  return [
    {
      name: "Open Folder",
      Icon: <FaRegFolderOpen size={20} />,
      Function: () => {},
    },
    {
      name: "Add in Tabs",
      Icon: <IoIosAdd size={20} />,
      Function: () => {},
    },
    {
      name: "Move Folder",
      Icon: <MdOutlineDriveFileMove size={20} />,
      Function: () => {},
    },
    {
      name: "Copy Folder",
      Icon: <MdFolderCopy size={20} />,
      Function: () => {},
    },

    {
      name: "Delete Folder",
      Icon: <MdDeleteOutline size={20} />,
      Function: () => {
        dispatch({ type: "setDeletFilePopup", deletFilePopupAction: true });
      },
    },
  ];
};

export const FileSettingsData = (data) => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: () => {
        console.log(data, "data");
        // dispatch({ type: "setAddNewTextfile", addNewTextfileAction: true });
        console.log(data);

        dispatch({
          type: "setFileViewerContent",
          fileViewerContentAction: {
            value: true,
            id: data.id,
            name: data.name,
            content: data.content,
            url: data.urls,
            modifiedAt: data.modifiedAt,
            interactions: data.interactions,
            sharedWith: data.sharedWith,
            viewers: data.viewers,
            status: data.status,
          },
        });
      },
    },
    {
      name: "Make File Public",
      Icon: <BsPeople size={20} />,
      Function: async (id, Data) => {
        if (window.confirm("Are you sure you want to make the folder public")) {
          console.log(id, Data);
          updateDoc(doc(fdb, "files", id), {
            status: Data.status === "public" ? "private" : "public",
          }).then(() => {
            dispatch({ type: "setRefreshData", refreshDataAction: true });
          });
        }
      },
    },
    {
      name: "Move File",
      Icon: <MdOutlineDriveFileMove size={20} />,
      Function: () => {},
    },
    {
      name: "Copy File",
      Icon: <MdFolderCopy size={20} />,
      Function: () => {},
    },
    {
      name: "Rename File",
      Icon: <MdOutlineDriveFileRenameOutline size={20} />,
      Function: (id) => {
        dispatch({
          type: "setRenameFolderPopup",
          renameFolderPopupAction: { value: true, id: id },
        });
      },
    },
    {
      name: "Delete File",
      Icon: <MdDeleteOutline size={20} />,
      Function: () => {},
    },
  ];
};

export const SavedFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: () => {
        dispatch({ type: "setAddNewTextfile", addNewTextfileAction: true });
      },
    },
    {
      name: "Download File",
      Icon: <BsPeople size={20} />,
      Function: () => {},
    },
    {
      name: "Move File",
      Icon: <MdOutlineDriveFileMove size={20} />,
      Function: () => {},
    },
    {
      name: "Copy File",
      Icon: <MdFolderCopy size={20} />,
      Function: () => {},
    },
    {
      name: "Delete File",
      Icon: <MdDeleteOutline size={20} />,
      Function: () => {},
    },
  ];
};
