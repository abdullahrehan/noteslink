const initialState=
    {
      email:"",
      name:null,
      isAdmin:false,
      openSideBar:false,
      refreshData:false,
      refreshTabs:false,
      homeCurrentFoler:{name:"My Computer",data:[]},
      homeFolderPath:["My Computer"],
      homeFilesRef:[],
      openFoldersPath:true,
      currentTab:null,
      currentFolder:null,
      addNewTextfile:false,
      fileViewerContent:[],
      openHomeSetings:false,
      saveFilePopup:false,
      newFolderNamePopup:false,
      renameFilePopup:{value:false,id:null},
      renameFolderPopup:{value:false,id:null},
      deletFilePopup:false,
      deleteFolderPopup:false,
      showFeedbackForm:false,
      openAccountSettings:false,
      openNotifications:false,
      logoutPopup:false,
      openFileSettings:{
        value: false,
        event: null,
        index: null
      },
    }

export default initialState;
