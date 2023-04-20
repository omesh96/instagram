import React, { useContext } from 'react'
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css"
import { LoginContext } from '../Context/loginContext';
import { useNavigate } from 'react-router-dom';


const Modal = () => {
  const {setModalOpen}=useContext(LoginContext)
  const navigate=useNavigate()
  return (
  <div className="darkBg" onClick={()=>setModalOpen(false)}>
     <div className="centered">
      <div className='modal'>
      {/* modal header */}
       <div className="modalHeader">
        <h5 className='heading'>Confirm</h5>
       </div>
       <button className='closeBtn' onClick={()=>setModalOpen(false)}>
        {/* icon */}
        <RiCloseLine></RiCloseLine>
       </button>
       {/* modal content */}
       <div className="modalContent">
        Are You Really want to Log out ?
       </div>
       <div className="modalActions">
        <div className="actionsContainer">
          <button className='logOutBtn' onClick={()=>{
            setModalOpen(false)
            localStorage.clear()
            navigate("/signin")
          }}>Log Out</button>
          <button className='cancelBtn' onClick={()=>setModalOpen(false)}>Cancel</button>
        </div>
       </div>
    </div>
  </div>
  </div>
  )
}

export default Modal