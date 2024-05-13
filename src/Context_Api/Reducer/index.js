const Reducer = (state, action) => {
  
  switch (action.type) {

    case "setEmail": return { ...state, email: action.Email };
    case "setName": return { ...state, name: action.Name };
    case "setHomeCurrentFoler": return { ...state, homeCurrentFoler:action.openHomeSetingsAction };
    case "setHomeFolderPath": return { ...state, homeFolderPath:[...state.homeFolderPath ,action.homeFolderPathAction] };
    case "resetHomeFolderPath": return { ...state, homeFolderPath:action.homeFolderPathAction };
    case "setRefreshData": return { ...state, refreshData:action.refreshDataAction };
    case "setRefreshTabs": return { ...state, refreshTabs:action.refreshTabsAction };
    case "setShowFeedbackForm": return { ...state, showFeedbackForm:action.showFeedbackFormAction };
    case "setIsAdmin": return { ...state, isAdmin:action.isAdminAction };
    case "setFileViewerContent": return { ...state, fileViewerContent:action.fileViewerContentAction };
    case "setSearchFileViewerContent": return { ...state, searchFileViewerContent:action.searchFileViewerContentAction };
    case "setSideBar": return { ...state, openSideBar: action.sideBar };
    case "setOpenAccountSettings": return { ...state, openAccountSettings: action.openAccountSettingsAction };
    case "setOpenHomeSetings": return { ...state, openHomeSetings: action.openHomeSetingsAction };
    case "setOpenNotifications" : return { ...state, openNotifications: action.openNotificationsAction };
    case "setFolderPath": return { ...state, openFoldersPath: action.folderPath };
    case "setAddNewTextfile": return { ...state, addNewTextfile: action.addNewTextfileAction };
    case "setSaveFilePopup": return { ...state, saveFilePopup: action.saveFilePopupAction };
    case "setLogoutPopup": return { ...state, logoutPopup: action.logoutPopupAction };
    case "setNewFolderNamePopup": return { ...state, newFolderNamePopup: action.newFolderNamePopupAction };
    case "setRenameFilePopup": return { ...state, renameFilePopup: action.renameFilePopupAction };
    case "setRenameFolderPopup": return { ...state, renameFolderPopup: action.renameFolderPopupAction };
    case "setDeletFilePopup": return { ...state, deletFilePopup: action.deletFilePopupAction };
    case "setDeleteFolderPopup": return { ...state, deleteFolderPopup: action.deleteFolderPopup };
    case "setOpenFileSettings": return { ...state, openFileSettings: action.openFileSettingsAction };
    case "setHomeFilesRefInitialValue": return { ...state, homeFilesRef: action.homeFilesRefAction };
    case "setHomeFilesRef": return { ...state, homeFilesRef: action.homeFilesRefAction };

  }

};

export default Reducer;
