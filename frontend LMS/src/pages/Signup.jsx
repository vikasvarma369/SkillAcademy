import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate,  Link } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmailValid, isPasswordValid } from '../validators/validator';
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

        console.log("details",signupDetails);
        // if any file data not use so that from data not required
        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);

        const response = await dispatch(createAccount(formData));

        console.log("response", response)

        if(response?.payload?.data){
            setSignupDetails({
                email: '',
                fullName: '',
                password: '',
                avatar: ''
            })
    
            setPreviewImage("")
            navigate('/')
        }
    }

    return (
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
          <form onSubmit={OnFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35">
            <h1 className="text-2xl text-center font-bold">Registration Page</h1>
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
            <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
                Create account
            </button>
            <p className="text-center">
              Already have an account ? <Link to="/signin" className="cusror-pointer text-accent">Login</Link>
            </p>
          </form>
        </div>
      )
}

export default Signup
