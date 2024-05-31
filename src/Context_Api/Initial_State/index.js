const initialState=
    {
      email:"",
      name:null,
      profilePic:null,
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
      searchFileViewerContent:[],
      openHomeSetings:false,
      saveFilePopup:false,
      newFolderNamePopup:false,
      renameFilePopup:{value:false,id:null},
      renameFolderPopup:{value:false,id:null},
      deletFilePopup:false,
      deleteFolderPopup:false,
      showFeedbackForm:false,
      showPrivacyForm:false,
      showAccountSettings:false,
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
