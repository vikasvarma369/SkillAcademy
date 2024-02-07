import './App.css'
import { Routes, Route } from "react-router-dom";
// import pages
import Signup from './pages/Signup';
function App() {

  return (
    <>
      <Routes >
        <Route path='/signup' element ={<Signup />} />
      </Routes>
    </>
  )
}

export default App
