import React, { createContext, useReducer } from 'react';
import appMainReducer from './Reducer/index'; // Import your reducer here
import initialState from './Initial_State/index'
const AppContext = createContext([]);


export const AppContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appMainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
