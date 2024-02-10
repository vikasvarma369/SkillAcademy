import './App.css'
import { Routes, Route } from "react-router-dom";
// import pages
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
// import Aboutus from './pages/Aboutus';
import Denied from './pages/Denied';
import Notfound from './pages/NotFound';
import Signin from './pages/Signin';
import Contacts from './pages/Contacts';
import CourseList from './pages/course/CourseList';
import CourseDescription from './pages/course/CourseDescription';
// import HomeLayout from './layouts/HomeLayout';
function App() {

  return (
    <>
      <Routes >
      <Route path='/' element={<HomePage />} />
        <Route path='/signup' element ={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/denied' element={<Denied />} />
       <Route path='*' element={<Notfound />} />


       <Route path='/courses' element={<CourseList />} />
       <Route path='/course/description' element = {<CourseDescription />} /> 
      </Routes>
    </>
  )
}

export default App
