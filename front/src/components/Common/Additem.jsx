import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slides/modalSlice';


const Additem = () => {
    const dispatch =useDispatch()
    const handleOpenModal =()=>{
        dispatch(openModal({modalType:'create', task: null}))
    }
  return (
    <div className='add-card item w-1/3 h-[25vh] p-[0.25rem]'>
        <div className='w-full h-full border border-gray-500 rounded-md flex py-3 items-center justify-center'>
            <button className='flex items-center gap-2 group' onClick={handleOpenModal}>
                <IoMdAddCircleOutline className='w-8 h-8 text-gray-400 font-light group-hover:text-gray-200'/>
                <span className='text-gray-400 hover:text-gray-200'>할일 추가하기</span>
            </button>
        </div>
    </div>
  )
}

export default Additem