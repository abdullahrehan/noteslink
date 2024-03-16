const Reducer = (state, action) => {
  
    const {
      openSideBar,
      openFoldersPath,
      currentTab,
      currentFolder,
  } = state;

  switch (action.type) {
    case "setSideBar":
      return { ...state, openSideBar: action.sideBar };

    case "setFolderPath":
      return { ...state, openFoldersPath: action.folderPath };
  }
};
export default Reducer;
