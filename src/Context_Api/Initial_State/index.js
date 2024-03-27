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

      saveFilePopup:false,
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

    const authReducerVar={ 
      tab:"signin",
      showpassword:false,
      resetkeys:false,
      chooseContext:1,
  
      }
  
      const signinReducerVar={ 
      signinusername:"",
      signinuseremail:"",
      signinuserpassword:"",
      errorsigninusername:false,
      errorsigninuseremail:false,
      errorsigninuserpassword:false,
      allFieldMandatorySigninErrror:false,
      signinErrorsEmailDBCheck:false,
      confirmCode:false,
      confirmationCodeInput:{},
      signupmessage:null,
      inCompleteCodeError:false,
      signinInputNo:1,
  
  }
  
  const loginReducerVar={ 
      loginuserimage:"",
      loginusername:null,
      loginuseremail:null,
      loginuserpassword:null,
      passwordIncorrectDiv:false,
      emailIncorrectPageError:false,
      passwordIncorrectPageError:false,
      allFieldMandatoryLoginErrror:false,
      signinInputNo:1,
  
  }    

export default initialState;
export {signinReducerVar,loginReducerVar,authReducerVar}