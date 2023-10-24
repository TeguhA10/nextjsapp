import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { deleteItem } from '../components/action';

export default function removebutton({ id }) {

  const handleDelete = () => {
    deleteItem(id);
  };

  return (
    <>
      <button className=' text-red-500  hover:text-red-700' onClick={() => document.getElementById(`my_modal_1${id}`).showModal()}><FaTrashAlt /></button>
      <dialog id={`my_modal_1${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Alert!</h3>
          <p className="py-4 text-red-600">Are you sure for delete this item?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <span className="btn btn-primary" onClick={handleDelete}>Yes</span>
              <button className="btn ml-2 bg-green-600 text-white">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
