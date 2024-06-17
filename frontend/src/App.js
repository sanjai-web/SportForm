import Home from "./pages/home"
import Navbar from "./pages/navbar"
import About from "./pages/about"
import League from "./pages/league"
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>

     <BrowserRouter>
     <Routes>
     <Route path='/home' element={<Home />} />
     <Route path='/league' element={<League />} />
     <Route path='/about' element={<About />} />
     <Route path='/navabr' element={<Navbar />} />
     </Routes>
     
     </BrowserRouter>
    </>
  );
}

export default App;
