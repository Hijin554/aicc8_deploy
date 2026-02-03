
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Completed from './components/Completed';
import Important from './components/Important';
import Procedding from './components/Proceeding';
import Home from './components/Home'


const App =() => {
  

  return <BrowserRouter>
  <div>
  <Routes>
  <Route path ="/" element ={<Home/>}/>
    <Route path ="/completed" element ={<Completed/>} />
    <Route path ="/important" element ={<Important/>} />
    <Route path ="/proceeding" element ={<Procedding/>} />
  </Routes>
  </div>
  </BrowserRouter>
    
  
}

export default App
