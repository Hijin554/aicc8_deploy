import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  POST_TASK_API_URL,
  GET_TASKS_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
  DELETE_TASK_API_URL,
  UPDATE_TASK_API_URL,
} from '../../utils/apiUrls';

// 🌟 putRequest를 import 목록에 추가해야 합니다 (만약 없다면 patchRequest를 대신 쓰기도 합니다)
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../../utils/requests';

// 1. 공통 비동기 액션 생성 로직
const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    const options = {
      body: JSON.stringify(postData),
    };
    return await postRequest(apiURL, options);
  });
};

const getItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

const updateCompletedFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    return await patchRequest(apiURL, options);
  });
};

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (itemId) => {
    // itemId가 객체인 경우를 대비해 itemId._id || itemId로 처리
    const targetId = typeof itemId === 'object' ? itemId._id : itemId;
    const options = { method: "DELETE" };
    return await deleteRequest(`${apiURL}/${targetId}`, options);
  });
};
const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    // 수정 시에도 해당 아이템의 ID가 URL에 포함되어야 함
    const targetId = updateData._id;
    const options = {
      method: "PUT", // 🌟 method 명시 확인
      body: JSON.stringify(updateData),
      headers: { 'Content-Type': 'application/json' } // 🌟 헤더 확인
    };
    return await putRequest(`${apiURL}/${targetId}`, options);
  });
};
// 2. Thunk 액션 export
export const fetchDeleteItem = deleteItemFetchThunk('fetchDeleteItem', DELETE_TASK_API_URL);
export const fetchGetItem = getItemFetchThunk('fetchGetItem', GET_TASKS_API_URL);
export const fetchPostItem = postItemFetchThunk('fetchPostItem', POST_TASK_API_URL);
export const fetchUpdateCompleted = updateCompletedFetchThunk('fetchUpdateCompleted', UPDATE_COMPLETED_TASK_API_URL);

// 🌟 Modal.jsx에서 부르는 이름인 apiUpdateTask로 export 합니다.
export const apiUpdateTask = updateItemFetchThunk('apiUpdateTask', UPDATE_TASK_API_URL);

// 3. 리듀서 핸들러
const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log('Error', action.error.message);
};

// 4. Slice 생성
const apisSlice = createSlice({
  name: 'api',
  initialState: {
    postItemData: null,
    getItemData: null,
    updateCompletedData: null,
    deleteItemData: null,
    putTaskData: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostItem.fulfilled, handleFulfilled('postItemData'))
      .addCase(fetchPostItem.rejected, handleRejected)
      .addCase(fetchGetItem.fulfilled, handleFulfilled('getItemData'))
      .addCase(fetchGetItem.rejected, handleRejected)
      .addCase(fetchUpdateCompleted.fulfilled, handleFulfilled('updateCompletedData'))
      .addCase(fetchUpdateCompleted.rejected, handleRejected)
      .addCase(fetchDeleteItem.fulfilled, handleFulfilled('deleteItemData'))
      .addCase(fetchDeleteItem.rejected, handleRejected)
      // 🌟 builder 체이닝 수정 및 이름 변경
      .addCase(apiUpdateTask.fulfilled, handleFulfilled('putTaskData'))
      .addCase(apiUpdateTask.rejected, handleRejected);
  },
});

export default apisSlice.reducer;