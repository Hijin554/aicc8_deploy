import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slides/authSlice';
import modalReducer from './slides/modalSlice';
import apiReducer from './slides/apiSlice'

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    modal: modalReducer,
    api: apiReducer,
  }),
});

export default store;