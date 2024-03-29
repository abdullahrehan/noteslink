const Reducer = (state, action) => {
  switch (action.type) {
    case "setSideBar":
      return { ...state, openSideBar: action.sideBar };

    case "setOpenAccountSettings":
      return {
        ...state,
        openAccountSettings: action.openAccountSettingsAction,
      };

    case "setOpenHomeSetings":
      return { ...state, openHomeSetings: action.openHomeSetingsAction };

    case "setOpenNotifications":
      return { ...state, openNotifications: action.openNotificationsAction };

    case "setFolderPath":
      return { ...state, openFoldersPath: action.folderPath };

    case "setAddNewTextfile":
      return { ...state, addNewTextfile: action.addNewTextfileAction };

    case "setSaveFilePopup":
      return { ...state, saveFilePopup: action.saveFilePopupAction };

    case "setLogoutPopup":
      return { ...state, logoutPopup: action.logoutPopupAction };

    case "setNewFolderNamePopup":
      return { ...state, newFolderNamePopup: action.newFolderNamePopupAction };

    case "setRenameFilePopup":
      return { ...state, renameFilePopup: action.renameFilePopupAction };

    case "setRenameFolderPopup":
      return { ...state, renameFolderPopup: action.renameFolderPopupAction };

    case "setDeletFilePopup":
      return { ...state, deletFilePopup: action.deletFilePopupAction };

    case "setDeleteFolderPopup":
      return { ...state, deleteFolderPopup: action.deleteFolderPopup };

    case "setOpenFileSettings":
      return { ...state, openFileSettings: action.openFileSettingsAction };

    case "setHomeFilesRefInitialValue":
      return { ...state, homeFilesRef: action.homeFilesRefAction };

    case "setHomeFilesRef":
      return { ...state, homeFilesRef: action.homeFilesRefAction };
  }
};
export default Reducer;
