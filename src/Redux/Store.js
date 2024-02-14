import RootReducer from "./Reducer/index.js"
import { legacy_createStore as createStore } from "@reduxjs/toolkit"
// import { createSlice } from '@reduxjs/toolkit';

const store = createStore(RootReducer);

export default store;