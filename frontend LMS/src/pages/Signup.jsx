import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,  Link } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmailValid, isPasswordValid } from '../validators/validator';
import GoogleAuth from '../components/GoogleAuth';
import HomeLayout from '../layouts/HomeLayout';
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
    });
    
    // handle input 
    function handleUserInput(event){
        const { name, value } = event.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        })
    }
    // handle image upload
    function handleimageUpload(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0]
        if(!uploadedImage){
            return
        }
        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage
        })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function(){
            setPreviewImage(this.result)
        })
    }
    // handle submit form 
    async function OnFormSubmit(event){
        event.preventDefault();
        if(!signupDetails.email || !signupDetails.password || !signupDetails.fullName ) {
            toast.error("Please fill all the details");
            return;
        }
        if(signupDetails.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        if(!isEmailValid(signupDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }
        // if(!isPasswordValid(signupDetails.password)) {
        //     toast.error("Password should 8-16 character long with atleast a number and a special character");
        //     return;
        // }

        setIsLoading(true)

        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);

        const response = await dispatch(createAccount(formData));

        // console.log("response", response)

        if(response?.payload?.data){
            setSignupDetails({
                email: '',
                fullName: '',
                password: '',
                avatar: ''
            })
            setIsLoading(false)
            setPreviewImage("")
            navigate('/')
        }
    }

    return (
        <HomeLayout>
            <div className="m-auto flex flex-col gap-6 items-center py-8 px-3 w-[90vw] min-h-[90vh]">
                <form onSubmit={OnFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35 dark:bg-base-100 md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl ">
                    <h1 className="text-2xl text-center font-bold dark:text-yellow-500 font-inter">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        { previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={handleimageUpload}
                        type="file" 
                        className="hidden"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input 
                            onChange={handleUserInput}
                            value={signupDetails.fullName}
                            name="fullName"
                            required
                            type="text" 
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your username..."
                            id="fullName" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            onChange={handleUserInput}
                            value={signupDetails.email} 
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
                            value={signupDetails.password}
                            required
                            type="password" 
                            name="password"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Password..."
                            id="password" />
                    </div>
                    <button
                        disabled={isLoading}
                        className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg dark:text-base-200 rounded-md font-nunito-sans text-white">
                        {isLoading ? "Creating account..." : "Create account"}
                    </button>
                    <p className="text-center">
                    Already have an account ? <Link to="/signin" className="cusror-pointer text-accent">Login</Link>
                    </p>
                    <GoogleAuth />
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup
