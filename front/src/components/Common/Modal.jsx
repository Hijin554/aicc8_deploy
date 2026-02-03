import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slides/modalSlice';
import { fetchGetItem, fetchPostItem } from '../../redux/slides/apiSlice';
import { toast } from "react-toastify";
import { apiUpdateTask } from '../../redux/slides/apiSlice';
import { getRequest } from '../../utils/requests';

const Modal = () => {
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const { modalType, task } = useSelector((state) => state.modal);
  const state = useSelector((state) => state.auth.authData);
  const user = state?.sub;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isCompleted: false,
    isImportant: false,
    _id: task._id,

  });



  // 수정/상세보기 시 기존 데이터 채워넣기
  useEffect(() => {
    if ((modalType === 'update' || modalType === 'details') && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        date: task.date || '',
        isCompleted: task.isCompleted || false,
        isImportant: task.isImportant || false,
        userId: user,
      });
    }
  }, [modalType, task, user]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // 모달 컨텐츠 제어 함수 수정
  const showModalContents = (type, str1, str2, str3) => {
    switch (type) {
      case 'update': return str1;
      case 'details': return str2;
      default: return str3; // 'add' 또는 기본값
    }
  };

  const modalTitle = showModalContents(modalType, '할일 수정하기', '할일 상세보기', '할일 추가하기');
  const modalBtn = showModalContents(modalType, '수정 완료', '', '할일 추가하기');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      // checkbox 타입일 때는 checked 값을 사용
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('잘못된 사용자입니다.');
      return;
    }
    if (!formData.title || !formData.description || !formData.date) {
      toast.error('모든 필드를 입력해 주세요.');
      return;
    }

    try {
      if (modalType === 'create') {
        await dispatch(fetchPostItem(formData)).unwrap();
        toast.success('할일이 추가되었습니다.');
      } else if (modalType === 'update') {
        await dispatch(fetchPutTask(formData)).unwrap();
        toast.success('할일이 수정되었습니다.');
      }
    } catch (error) {
      console.log('Error Post or Put Item Data: ', error);
      toast.error('할일 추가 또는 수정에 실패했습니다. 콘솔을 확인해 주세요.');
    }

    handleCloseModal();

    await dispatch(fetchGetItem(user)).unwrap();



  };

  return (
    <div className="modal fixed bg-black bg-opacity-50 w-full h-full left-0 top-0 z-50 flex justify-center items-center">
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-8 text-white">
        <h2 className="text-2xl py-2 border-b border-gray-300 w-fit font-semibold mb-6">
          {modalTitle}
        </h2>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-control mb-4">
            <label htmlFor="title" className="block mb-1">제목</label>
            <input
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="제목을 입력해 주세요..."
              onChange={handleChange}
              readOnly={modalType === 'details'}
            />
          </div>

          <div className="input-control mb-4">
            <label htmlFor="description" className="block mb-1">내용</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 h-32"
              name="description"
              id="description"
              value={formData.description}
              placeholder="내용을 입력해 주세요..."
              onChange={handleChange}
              readOnly={modalType === 'details'}
            ></textarea>
          </div>

          <div className="input-control mb-4">
            <label htmlFor="date" className="block mb-1">날짜</label>
            <input
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              type="date"
              id="date"
              name="date"
              value={formData.date} // 기존 formData.data 오타 수정
              onChange={handleChange}
              readOnly={modalType === 'details'}
            />
          </div>

          <div className="input-control mb-4 flex items-center gap-4">
            <label htmlFor="isCompleted">완료 여부</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
              disabled={modalType === 'details'}
            />
          </div>

          <div className="input-control mb-6 flex items-center gap-4">
            <label htmlFor="isImportant">중요성 여부</label>
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
              disabled={modalType === 'details'}
            />
          </div>

          <div className="submit-btn flex justify-end">
            {modalType !== 'details' && (
              <button
                type="submit"
                className="bg-blue-600 py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                {modalBtn}
              </button>
            )}
          </div>
        </form>

        <IoMdClose
          className="absolute right-6 top-6 cursor-pointer text-2xl"
          onClick={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Modal;