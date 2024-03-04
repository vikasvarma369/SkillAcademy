import About from "./Aboutus";
import Contact from "./Contacts";
import Denied from "./Denied";
import HomePage from "./HomePage";
import Notfound from "./NotFound";
import Signin from "./Signin";
import Signup from "./Signup";

// user profile page
import EditProfile from "./User/EditProfile";
import Profile from "./User/userProfile";

// payment page
import Checkout from "./payment/Checkout";
import CheckoutFail from "./payment/CheckoutFail";
import CheckoutSuccess from "./payment/CheckoutSuccess";

// password page 
import ChangePassword from "./password/ChangePassword";
import ForgotPassword from "./password/ForgotPassword";
import ResetPassword from "./password/ResetPassword";

// Dashboard page 
import Admin from "./Dashboard/Admin";
import AddLecture from "./Dashboard/AddLecture";
import DisplayLectures from "./Dashboard/DisplayLectures";

// course page 
import CourseDescription from "./course/CourseDescription";
import CourseList from "./course/CourseList";
import CreateCourse from "./course/CreateCourse";
import EditCourse from "./course/EditCourse"


export{
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
    EditCourse
}