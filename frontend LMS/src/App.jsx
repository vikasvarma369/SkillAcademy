import './App.css'
import { Routes, Route } from "react-router-dom";
// import pages
import {
  About,
  Signup,
  Signin,
  Notfound,
  HomePage,
  Contact,
  Denied,

  EditProfile,
  Profile,

  Checkout,
  CheckoutFail,
  CheckoutSuccess,

  ChangePassword,
  ForgotPassword,
  ResetPassword,

  Admin,
  AddLecture,
  DisplayLectures,

  CourseDescription,
  CourseList,
  CreateCourse,
  EditCourse,
  UpdateLecture} from './pages/index.js'
import RequireAuth from './components/auth/RequireAuth';



function App() {
  return (
    <>
      <Routes >
      <Route path='/' element={<HomePage />} />
        <Route path='/signup' element ={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/forgotpassword' element= {<ForgotPassword />} />
        <Route path='/reset-password/:resetToken' element = {<ResetPassword />} />
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

        {/* payment routes */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFail />} />

        {/* admin routes */}
        <Route element = {<RequireAuth allowedRolles= {['ADMIN']} />}>
          <Route path='/admin/dashboard' element = {<Admin />} />
          <Route path='/course/create' element ={<CreateCourse />} />
          <Route path='/course/edit' element ={<EditCourse />} />
          <Route path='/course/addlecture' element = {<AddLecture />} />
          <Route path='/course/updatelecture' element = {<UpdateLecture />} />
        {/* create course route */}
        </Route>
       
      </Routes>
    </>
  )
}

export default App
