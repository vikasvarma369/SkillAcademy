import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutUs from "./pages/About";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChangePassword from "./pages/password/ChangePassword"
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetPassword from "./pages/password/ResetPassword";
import CourseList from "./pages/Course/CourseList";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import CourseDescription from "./pages/Course/CourseDescription";

import RequireAuth from "./Components/auth/RequireAuth";
import CreateCourse from "./pages/Course/CreateCourse";
import Profile from "./pages/User/Profile";
import Checkout from "./pages/Payment/Checkout";
import CheckoutSuccess from "./pages/Payment/CheckoutSuccess";
import CheckoutFail from "./pages/Payment/CheckoutFail";
import DisplayLecture from "./pages/Dashboard/DisplayLecture";
import AddLecture from "./pages/Dashboard/AddLecture";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user/profile/reset-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/user/profile/reset-password/:resetToken"
          element={<ResetPassword />}
        />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route
            path="/user/profile/change-password"
            element={<ChangePassword />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/course/displaylectures" element={<DisplayLecture />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
