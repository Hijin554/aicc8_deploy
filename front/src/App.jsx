
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Completed from './components/Completed';
import Important from './components/Important';
import Procedding from './components/Proceeding';
import Home from './components/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App =() => {
  

  return <BrowserRouter>
  <div>
  <Routes>
  <Route path ="/" element ={<Home/>}/>
    <Route path ="/completed" element ={<Completed/>} />
    <Route path ="/important" element ={<Important/>} />
    <Route path ="/proceeding" element ={<Procedding/>} />
  </Routes>
  
  
<ToastContainer
position="bottom-center"
autoClose={1000}
theme="dark"

 />
  </div>
  </BrowserRouter>
    
  
}

export default App
