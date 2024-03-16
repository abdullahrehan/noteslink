// AppContext.js
import React, { createContext, useReducer } from 'react';
import appMainReducer from './Reducer/index'; // Import your reducer here

// Create the context
const AppContext = createContext([]);

// Define the initial state
const initialState = {
  openSideBar: false,
  openFoldersPath: true,
  currentTab: null,
  currentFolder: null,
};

// Create the context provider component
export const AppContextProvider = ({ children }) => {
  // Use the reducer hook to manage state
  const [state, dispatch] = useReducer(appMainReducer, initialState);

  // Return the context provider with the state and dispatch function
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
