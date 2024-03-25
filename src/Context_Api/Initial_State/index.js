const initialState=
    {
      openSideBar:false,
      openFoldersPath:true,
     
      openAccountSettings:false,
      openNotifications:false,

      currentTab:null,
      currentFolder:null,

      addNewTextfile:false,
      openHomeSetings:false,

      //  popups
      saveFilePopup:true,
      logoutPopup:false,
      newFolderNamePopup:false,
      renameFilePopup:false,
      renameFolderPopup:false,
      deletFilePopup:false,
      deleteFolderPopup:false,

      openFileSettings:{
        value: false,
        event: null,
        index: null
      },
      homeFilesRef:[],

    }

export default initialState;