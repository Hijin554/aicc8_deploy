import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './slides/authSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    modal: modalReducer
  }),
});

export default store;