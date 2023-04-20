import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AllRoutes from './AllRoutes/AllRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{createContext, useState} from "react"
import { LoginContext } from './Context/loginContext';
import Modal from './Component/Modal';
  

function App() {

  const [userLogin,setUserLogin]=useState(false)
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <div className="App">
    <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
    <Navbar login={userLogin}/>
      <AllRoutes />
      <ToastContainer theme="dark" />
      {modalOpen && <Modal></Modal>}
    </LoginContext.Provider>
    </div>
  );
}

export default App;
