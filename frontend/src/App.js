import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AllRoutes from './AllRoutes/AllRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function App() {
  return (
    <div className="App">
    <Navbar />
      <AllRoutes />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
