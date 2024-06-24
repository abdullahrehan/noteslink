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
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fdb } from "../../../../Firebase/firebaseConfig.js";
import { NavLink, useNavigate } from "react-router-dom";

export const FolderSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  return [
    {
      name: "Open Folder",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, Data) => {
        dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });
        navigate(`/noteslink/${id}`);
        // console.log(id)
      },
    },
    {
      name: `Change Status`,
      Icon: <BsPeople size={20} />,
      Function: async (id, Data) => {
        
        dispatch({ type: "setOpenHomeSetings", openHomeSetingsAction: false });

        setTimeout(() => {
          
        if (window.confirm(`Are you sure you want to make this folder ${Data.status === "public" ? "private" : "public"}`)) {
          console.log(id, Data);
          dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });
          updateDoc(doc(fdb, "files", id), {
            status: Data.status === "public" ? "private" : "public",
          }).then(() => {
            dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: false });
          });
        }
      }, 100);
    },
    },
    {
      name: "Add in Tabs",
      Icon: <IoIosAdd size={20} />,
      Function: async (id, Data) => {
        dispatch({
          type: "setRefreshTabs",
          refreshTabsAction: true,
        });
        await updateDoc(doc(fdb, "users", state.email.trim()), {
          tabs: arrayUnion({ id: Data.id, name: Data.name }),
        })
          .then(() => {
            console.log("done");
          })
          .catch((e) => {
            console.error(e);
          });
      },
    },
    // {
    //   name: "Move Folder",
    //   Icon: <MdOutlineDriveFileMove size={20} />,
    //   Function: () => {},
    // },
    // {
    //   name: "Copy Folder",
    //   Icon: <MdFolderCopy size={20} />,
    //   Function: () => {},
    // },
    {
      name: "Rename Folder",
      Icon: <MdOutlineDriveFileRenameOutline size={20} />,
      Function: (id) => {
        dispatch({type: "setRenameFolderPopup",renameFolderPopupAction: { value: true, id: id }});
      },
    },
    {
      name: "Delete Folder",
      Icon: <MdDeleteOutline size={20} />,
      Function: async (fId, fData) => {
        dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });
        dispatch({type: "setRefreshTabs",refreshTabsAction: true});
        const folders = await getDoc(doc(fdb, 'users', localStorage.getItem('userEmail').trim()))
        const Tabs = folders.data().tabs
        console.log("Tabs ==================================>",folders.data())
        getAllDescendantIds(fData.id)
          .then((allIds) => {
            console.log("All descendant IDs:", allIds);
            allIds.push(fData.id); // Include the folder itself
            allIds.forEach(async(id) => {
              await getDoc(doc(fdb, "files", id)).then(async(response) => {
                const owner = response.data().owner;
                if (
                  localStorage
                    .getItem("userEmail")
                    .split("@")[0]
                    .toLowerCase() === owner
                ) {
                  await deleteDoc(doc(fdb, "files", id))
                    .then(async() => {
                      await updateDoc(doc(fdb, 'users', localStorage.getItem('userEmail')), {
                        tabs: Tabs.filter(data => data.id !== id)
                      })
                      if (response.data().id == fId) {
                        await setDoc(
                          doc(fdb, "recycleBin", response.data().id),
                          { ...response.data(), head: true }
                        );
                      } else {
                        await setDoc(doc(fdb, "files", response.data().id), {
                          ...response.data(),
                          head: false,
                        });
                      }
                    })
                    .then(()=>{
                      console.log('234')
           

                    })
                    .catch((error) => {
                      console.error("Error deleting document:", error);
                    });
                }
              });
            });
          }).then(()=>{
            console.log('234')
            // dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: false });

          })
          .catch((error) => {
            console.error("Error fetching descendant IDs:", error);
          });
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
        // console.log(data)
        dispatch({
          type: "setFileViewerContent",
          fileViewerContentAction: {
            value: true,
            id: data.id,
            name: data.name,
            keywords: data.keywords,
            likes: data.likes,
            content: data.content,
            url: data.Url,
            modifiedAt: data.modifiedAt,
            interactions: data.interactions,
            sharedWith: data.sharedWith,
            viewers: data.viewers,
            status: data.status,
            likedBy: data.likedBy,
            type: data.type,
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
      Function: async (fId, fData) => {
        console.log("delete pressed");
        if (fData.type === "folder") {
          getAllDescendantIds(fData.id)
            .then((allIds) => {
              console.log("All descendant IDs:", allIds);
              allIds.push(fData.id); // Include the folder itself
              allIds.forEach(async (id) => {
                await getDocs(doc(fdb, "files", id)).then(async (response) => {
                  const owner = response.data().owner;
                  if (
                    localStorage
                      .getItem("userEmail")
                      .split("@")[0]
                      .toLowerCase() === owner
                  ) {
                    await deleteDoc(doc(fdb, "files", id))
                      .then(async () => {
                        if (response.data().id == fId) {
                          await setDoc(
                            doc(fdb, "recycleBin", response.data().id),
                            { ...response.data(), head: true }
                          );
                        } else {
                          await setDoc(doc(fdb, "files", response.data().id), {
                            ...response.data(),
                            head: false,
                          });
                        }
                      }).then(()=>{
                        console.log('234')
                        dispatch({ type: "setRefreshHomeData", refreshHomeDataAction: true });

                      })
                      .catch((error) => {
                        console.error("Error deleting document:", error);
                      });
                  } else {
                  }
                });
              });
            })
            .catch((error) => {
              console.error("Error fetching descendant IDs:", error);
              // setWaiting(false);
            });
        } else {
          await getDoc(doc(fdb, "files", fId)).then(async (response) => {
            const owner = response.data().owner;
            if (
              localStorage.getItem("userEmail").split("@")[0].toLowerCase() ===
              owner
            ) {
              await setDoc(doc(fdb, "recycleBin", response.data().id), {
                ...response.data(),
                head: true,
              });
              await deleteDoc(doc(fdb, "files", response.data().id))
                .then(async () => {})
                .catch((error) => {
                  console.error("Error deleting document:", error);
                });
            } else {
            }
          });
        }
      },
    },
  ];
};

export const PublicFolderSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  return [
    {
      name: "Open Folder",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, Data) => {
        console.log("Here ===============> ", id);
        navigate(`/publicfiles/${id}`);
      },
    },
    {
      name: "Make Folder Private",
      Icon: <BsPeople size={20} />,
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

export const PublicFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, data) => {
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
      name: "Make File Private",
      Icon: <BsPeople size={20} />,
      Function: (id, Data) => {
        if (window.confirm("Are you sure you want to make the folder public")) {
          console.log(id, Data);
          updateDoc(doc(fdb, "files", id), {
            status: "private",
          }).then(() => {
            dispatch({ type: "setRefreshData", refreshDataAction: true });
          });
          dispatch({
            type: "setOpenFileSettings",
            openFileSettingsAction: { value: false, event: null, index: null },
          });
        }
      },
    },
    // {
    //   name: "Delete File",
    //   Icon: <MdDeleteOutline size={20} />,
    //   Function: () => {
    //     dispatch({ type: "setDeletFilePopup", deletFilePopupAction: true });
    //   },
    // },
  ];
};

export const SearchFolderSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);
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
      name: "Save Folder",
      Icon: <BsPeople size={20} />,
      Function: () => {},
    },
  ];
};

export const SearchFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (id, data) => {
        console.log(data);
        dispatch({
          type: "setSearchFileViewerContent",
          searchFileViewerContentAction: {
            owner: data.owner,
            likes: data.interactions,
            value: true,
            id: data.id,
            bookmarks: data.bookmarks,
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
      name: "Save File ",
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

export const SavedFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: (id, data) => {
        console.log(data);
        dispatch({
          type: "setSavedFileViewerContent",
          savedFileViewerContentAction: {
            owner: data.owner,
            likes: data.interactions,
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
        // dispatch({
        //   type: "setFileViewerContent",
        //   fileViewerContentAction: {
        //     value: true,
        //     id: data.id,
        //     name: data.name,
        //     keywords: data.keywords,
        //     likes: data.likes,
        //     content: data.content,
        //     url: data.Url,
        //     modifiedAt: data.modifiedAt,
        //     interactions: data.interactions,
        //     sharedWith: data.sharedWith,
        //     viewers: data.viewers,
        //     status: data.status,
        //     likedBy: data.likedBy,
        //     type: data.type,
        //   },
        });
        // dispatch({ type: "setAddNewTextfile", addNewTextfileAction: true });
      },
    },
    {
      name: "Download File",
      Icon: <BsPeople size={20} />,
      Function: () => {},
    },
    // {
    //   name: "Delete File",
    //   Icon: <MdDeleteOutline size={20} />,
    //   Function: () => {



    //   },
    // },
  ];
};
async function getAllDescendantIds(parentId) {
  let allIds = [];
  const querySnapshot = await getDocs(
    query(collection(fdb, "files"), where("parent", "==", parentId))
  );
  const childDocs = querySnapshot.docs;

  for (const doc of childDocs) {
    allIds.push(doc.id);
    if (doc.data().type === "folder") {
      const childIds = await getAllDescendantIds(doc.id);
      allIds = allIds.concat(childIds);
    }
  }

  return allIds;
}
export const DeleteFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Restore",
      Icon: <FaRegFolderOpen size={20} />,
      Function: async (fId, fData) => {
        console.log("delete pressed");
        if (fData.type === "folder") {
          getAllDescendantIds(fData.id)
            .then((allIds) => {
              console.log("All descendant IDs:", allIds);
              allIds.push(fData.id); // Include the folder itself
              allIds.forEach(async (id) => {
                await getDocs(doc(fdb, "recycleBin", id)).then(async (response) => {
                  const owner = response.data().owner;
                  if (
                    localStorage
                      .getItem("userEmail")
                      .split("@")[0]
                      .toLowerCase() === owner
                  ) {
                    await deleteDoc(doc(fdb, "recycleBin", id))
                      .then(async () => {
                        if (response.data().id == fId) {
                          await setDoc(
                            doc(fdb, "files", response.data().id),
                            { ...response.data(), head: true }
                          );
                        } else {
                          await setDoc(doc(fdb, "recycleBin", response.data().id), {
                            ...response.data(),
                            head: false,
                          });
                        }
                      })
                      .catch((error) => {
                        console.error("Error deleting document:", error);
                      });
                  } else {
                  }
                });
              });
            })
            .catch((error) => {
              console.error("Error fetching descendant IDs:", error);
              // setWaiting(false);
            });
        } else {
          await getDoc(doc(fdb, "recycleBin", fId)).then(async (response) => {
            const owner = response.data().owner;
            if (
              localStorage.getItem("userEmail").split("@")[0].toLowerCase() ===
              owner
            ) {
              await setDoc(doc(fdb, "files", response.data().id), {
                ...response.data(),
                head: true,
              });
              await deleteDoc(doc(fdb, "recycleBin", response.data().id))
                .then(async () => {})
                .catch((error) => {
                  console.error("Error deleting document:", error);
                });
            } else {
            }
          });
        }
      },
    },
    {
      name: "Delete Permanently",
      Icon: <BsPeople size={20} />,
      Function: async (id, selected) => {
        console.log(selected);
        if (selected.type === "folder") {
          getAllDescendantIds(selected.id)
            .then((allIds) => {
              console.log("All descendant IDs:", allIds);
              allIds.push(selected.id); // Include the folder itself
              allIds.forEach(async (id) => {
                await deleteDoc(doc(fdb, "recycleBin", id))
                  .then(async () => {})
                  .catch((error) => {
                    console.error("Error deleting document:", error);
                  });
              });
            })
            .catch((error) => {
              console.error("Error fetching descendant IDs:", error);
            });
        } else {
          await deleteDoc(doc(fdb, "recycleBin", selected.id));
        }
      },
    },
  ];
};

export const SharedFileSettingsData = () => {
  const { state, dispatch } = useContext(AppContext);

  return [
    {
      name: "Open File",
      Icon: <FaRegFolderOpen size={20} />,
      Function: (id, data) => {
        console.log(data);
        dispatch({
          type: "setSharedFileViewerContent",
          sharedFileViewerContentAction: {
            owner: data.owner,
            likes: data.interactions,
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
        dispatch({ type: "setRefreshData", refreshDataAction: true });
      },
    },
    {
      name: "Remove Access",
      Icon: <BsPeople size={20} />,
      Function: async (id, selected) => {
        let data = selected.sharedWith.filter(
          (data) => data !== localStorage.getItem("userEmail").split("@")[0]
        )
        console.log(selected.sharedWith,data)
        console.log('here')
        await updateDoc(doc(fdb, "files", id), {
          sharedWith: data
        });
      },
    },
  ];
};
