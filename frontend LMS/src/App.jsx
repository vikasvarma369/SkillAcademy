import './App.css'
import { Routes, Route } from "react-router-dom";
// import pages
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
// import Aboutus from './pages/Aboutus';
import Denied from './pages/Denied';
import Notfound from './pages/NotFound';
import Signin from './pages/Signin';
import Contact from './pages/Contacts';
import CourseList from './pages/course/CourseList';
import CourseDescription from './pages/course/CourseDescription';
import About from './pages/Aboutus';
import RequireAuth from './components/auth/RequireAuth';
import CreateCourse from './pages/course/CreateCourse';
import Profile from './pages/User/userProfile';
import EditProfile from './pages/User/EditProfile';
import ChangePassword from './pages/password/ChangePassword';
import DisplayLectures from './pages/Dashboard/DisplayLectures';
// import HomeLayout from './layouts/HomeLayout';
function App() {

  return (
    <>
      <Routes >
      <Route path='/' element={<HomePage />} />
        <Route path='/signup' element ={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='*' element={<Notfound />} />

        {/* user routes */}
        <Route element = {<RequireAuth allowedRolles={['ADMIN', 'USER']} />}>
          <Route path='/user/profile' element ={<Profile />} />
          <Route path='/user/updateprofile' element = {<EditProfile />} />
          <Route path='/user/changepassword' element= {<ChangePassword />} />
        </Route>

        {/* course Routes */}
        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element = {<CourseDescription />} /> 
        <Route path='/course/displaylectures' element = {<DisplayLectures />} />
        {/* create course route */}
        <Route element = {<RequireAuth allowedRolles= {['ADMIN']} />}>
          <Route path='/course/create' element ={<CreateCourse />} />
        </Route>
       
      </Routes>
    </>
  )
}

export default App
