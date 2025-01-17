import { AiFillCloseCircle} from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from "../components/Footer";
import { logout } from '../Redux/Slices/AuthSlice';


function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function onLogout(e) {
        e.preventDefault();
        const responce = await dispatch(logout())
        if(responce.payload.data){
            navigate("/");
        }
        
    }

    return (

        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-full">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <FiMenu onClick={changeWidth} size={"32px"} className=' text-white m-4' />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className='menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative'>
                        <li className='w-fit font-bold absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}
                                className='text-white '/>
                            </button>
                        </li>
                        <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                            <Link to="/"> Home </Link>
                        </li>
                        {/* admin dashbord */}
                        {isLoggedIn && role === "ADMIN" && (
                            <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                            </li>
                        )
                        }
                        {/* create course */}
                        {isLoggedIn && role === "ADMIN" && (
                            <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                                <Link to="/course/create">Create Course</Link>
                            </li>
                        )
                        }
                        <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                            <Link to="/about"> About us </Link>
                        </li>
                        <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                            <Link to="/contact"> Contact us </Link>
                        </li>
                        <li className='text-xl hover:text-2xl font-semibold hover:text-white'>
                            <Link to="/courses"> All Courses </Link>
                        </li>

                        {!isLoggedIn ? (
                            <li className="absolute bottom-6  w-[90%]">
                                <div className="w-full flex sm:flex-row flex-col gap-8 items-center justify-center">
                                    <button className="bg-primary hover:opacity-65 hover:text-white btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link className='text-xl' to="/signin">Login</Link>
                                    </button>
                                    <button className=" bg-secondary hover:opacity-65 hover:text-white btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link className='text-xl' to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <button className= "bg-primary hover:opacity-65 hover:text-white btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link className='text-xl' to="/user/profile">Profile</Link>
                                    </button>
                                    <button className=" bg-secondary hover:opacity-65 hover:text-white btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                        <Link className='text-xl' onClick={onLogout}>Logout</Link>
                                    </button>
                                </div>
                            </li>
                        )

                        }
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
        
    );
}
export default HomeLayout;