import './App.css'
import { Routes, Route } from "react-router-dom";
// import pages
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Aboutus from './pages/Aboutus';
import Denied from './pages/Denied';
import Notfound from './pages/NotFound';
import Signin from './pages/Signin';
function App() {

  return (
    <>
      <Routes >
        <Route path='/signup' element ={<Signup />} />
        <Route path='/login' element={<Signin />} />
       {/* <Route path='/about' element={<Aboutus />} /> */}
       <Route path='/denied' element={<Denied />} />
      <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
