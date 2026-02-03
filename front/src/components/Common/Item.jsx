import React, { useState } from 'react';
import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchDeleteItem,
  fetchGetItem,
  fetchUpdateCompleted,
  apiUpdateTask
} from '../../redux/slides/apiSlice';
import { openModal } from '../../redux/slides/modalSlice';

const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userId } = task;
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);
  const [isImportant, setIsImportant] = useState(isimportant);

  const cutOverText = (text, length, lastDots) => {
    if (!length) length = 20;
    if (!lastDots) lastDots = ' ...';
    if (text && text.length > length) {
      return text.substr(0, length) + lastDots;
    }
    return text;
  };

  const changeCompleted = async () => {
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: _id, isCompleted: newIsCompleted }),
    };
    try {
      await dispatch(fetchUpdateCompleted(options)).unwrap();
      toast.success(newIsCompleted ? '할일을 완료했습니다.' : '할일이 진행 중입니다.');
      await dispatch(fetchGetItem(userId)).unwrap();
    } catch (error) {
      toast.error('상태 업데이트 실패');
      setIsCompleted(!newIsCompleted);
    }
  };

  const changeImportant = async () => {
    const newIsImportant = !isImportant;
    setIsImportant(newIsImportant);
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: _id, isImportant: newIsImportant }),
    };
    try {
      await dispatch(fetchUpdateCompleted(options)).unwrap();
      toast.success(newIsImportant ? '중요 항목 설정' : '일반 항목 설정');
      await dispatch(fetchGetItem(userId)).unwrap();
    } catch (error) {
      toast.error('중요도 변경 실패');
      setIsImportant(!newIsImportant);
    }
  };

  const handleDeleteItem = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await dispatch(fetchDeleteItem(_id)).unwrap();
      toast.success('삭제 완료');
      if (userId) await dispatch(fetchGetItem(userId)).unwrap();
    } catch (error) {
      console.error('Delete Failed:', error);
      toast.error('삭제 실패');
    }
  };

  const handleDeleteModal = () => dispatch(openModal({ modalType: 'details', task }));
  const handleEditOpenModal = () => dispatch(openModal({ modalType: 'update', task }));

  // 🌟 이 return 문이 반드시 Item 함수의 { } 내부에 있어야 합니다.
  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950 text-white">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2 flex justify-between border-b">
            <span>{title}</span>
            <span className="text-sm py-1 px-3 border border-gray-500 rounded-sm hover:bg-gray-700 cursor-pointer" onClick={handleDeleteModal}>
              자세히
            </span>
          </h2>
          <p className="text-gray-300">{cutOverText(description)}</p>
        </div>

        <div className="lower">
          <p className="text-sm mb-1 text-gray-500">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="flex gap-2">
              <button className={`block py-1 px-4 text-sm text-white rounded-md ${isCompleted ? 'bg-green-400' : 'bg-cyan-500'}`} onClick={changeCompleted}>
                {isCompleted ? 'Completed' : 'Incomplete'}
              </button>
              <button className={`block py-1 px-4 text-sm text-white rounded-md ${isImportant ? 'bg-red-500' : 'bg-gray-500'}`} onClick={changeImportant}>
                {isImportant ? 'Important' : 'Normal'}
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleEditOpenModal}><MdEditDocument className="w-5 h-5 hover:text-cyan-400" /></button>
              <button onClick={handleDeleteItem}><FaTrash className="w-5 h-5 hover:text-red-500" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;