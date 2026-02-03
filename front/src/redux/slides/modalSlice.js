import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen:false,
    modalType:"create",
    task : null
  };


  const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
     openModal: (state, action) => {
        state.isOpen = true
        state.modalType =action.payload.modalType; //로그인 성공 시 상태값 업데이트 
        state.task =action.payload.task;
      },
      closeModal:(state) =>{
        state.isOpen =false;
        
      }
    },
  });
  
  export const { openModal, closeModal } = modalSlice.actions;
  export default modalSlice.reducer;
  