import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,  Link } from 'react-router-dom'
import toast from "react-hot-toast";
import { isEmailValid, isPasswordValid } from '../validators/validator';
import { login } from '../Redux/Slices/AuthSlice';
import GoogleAuth from '../components/GoogleAuth';
import HomeLayout from '../layouts/HomeLayout';
export default function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: '',
    });
    
    // handle input 
    function handleUserInput(event){
        const { name, value } = event.target;
        setSigninDetails({
            ...signinDetails,
            [name]: value
        })
    }

    // handle submit form 
    async function OnFormSubmit(event){
        event.preventDefault();
        if(!signinDetails.email || !signinDetails.password ) {
            toast.error("Please fill all the details");
            return;
        }
        if(!isEmailValid(signinDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }
        // if(!isPasswordValid(signinDetails.password)) {
        //     toast.error("Password should 8-16 character long with atleast a number and a special character");
        //     return;
        // }

        console.log("details",signinDetails);
        // if any file data not use so that from data not required
        // const formData = new FormData();
        // formData.append("email", signinDetails.email);
        // formData.append("password", signinDetails.password);

        const response = await dispatch(login(signinDetails));

        console.log("response", response)

        if(response?.payload?.data){
            setSigninDetails({
                email: '',
                password: '',
            })
            navigate('/')
        }
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[90vh]">
                <form onSubmit={OnFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35">
                    <h1 className="text-2xl text-center font-bold">Login Page</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={signinDetails.email} 
                            required
                            type="text" 
                            name="email"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Email..."
                            id="email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                            onChange={handleUserInput}
                            value={signinDetails.password}
                            required
                            type="password" 
                            name="password"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Password..."
                            id="password" />
                    </div>
                    <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
                        Login
                    </button>
                    <p className="text-center">
                    <Link to="/forgotpassword" className="cusror-pointer text-accent">Forgot Password</Link>
                    </p>
                    <p className="text-center">
                    Don't have an account ? <Link to="/signup" className="cusror-pointer text-accent">Create Account</Link>
                    </p>
                    <GoogleAuth />
                </form>
            </div>
        </HomeLayout>
    )    
}

 
