import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AllRoutes from './AllRoutes/AllRoutes';

function App() {
  return (
    <div className="App">
    <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
