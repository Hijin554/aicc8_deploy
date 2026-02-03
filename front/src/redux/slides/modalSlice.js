import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen:false,
    modalType:"create",
    tasks : null
  };


  const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
     openModal: (state, action) => {
        state.isOpen = true
        state.modalType =action.payload.authData.payload.modalType; //로그인 성공 시 상태값 업데이트 
        state.tasks =action.payload.taks
      },
      closeNodal:(state) =>{
        state.authData =false;
        
      }
    },
  });
  
  export const { openModal, closeNodal } = modalSlice.actions;
  export default modalSlice.reducer;
  