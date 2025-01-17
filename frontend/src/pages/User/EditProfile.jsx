import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
export default function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // state
    const [data, setData] = useState({
        fullName: "",
        previewImage: "",
        avatar: undefined,
        userId: useSelector((state)=> state?.auth?.data?._id),
    });
    const [isLoading, setIsLoading] = useState(false)

    // handle image upload
    function handleImageUpload(e){
        e.preventDefault()
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    avatar: uploadedImage,
                    previewImage: this.result
                })
            })
        }
    }

    // handle input change 
    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    // handle form submit event 
    async function handleFormSubmit(e){
        e.preventDefault();
        if(!(data.fullName || data.avatar)) {
            toast.error("Empty values not allowed");
            return;
        }
        if(data.fullName.length < 5) {
            toast.error("Name cannot be less than 5 characters");
            return;
        }
        setIsLoading(true)

        // form data 
        const formData = new FormData();
        formData.append("fullName", data.fullName)
        formData.append("avatar", data.avatar)
        await dispatch(updateProfile([data.userId, formData]));
        dispatch(getUserData());
        setIsLoading(false)
        navigate("/user/profile");
    }

  return (
    <HomeLayout>
        <div className="flex items-center justify-center min-h-[85vh]">
            <form 
                onSubmit={handleFormSubmit}
                noValidate
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-full sm:w-80 min-h-[26rem] shadow-[0_0_10px_black]"
            >
                <h1 className="text-center text-3xl font-semibold text-yellow-400">
                        Edit Profile
                </h1>
                <label htmlFor="image_uploads" className=' cursor-pointer '>
                    {
                        data.previewImage ?(
                            <img src={data.previewImage} alt="profile image" className="w-28 h-28 rounded-full m-auto" />
                        ):(
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                        )
                    }
                </label>
                <p className='text-center font-semibold'>Change Profile image</p>
                <input 
                    onChange={handleImageUpload}
                    type="file" 
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .png, .jpeg, .svg"
                    className="hidden"
                />

                {/* name update section */}
                <div className="flex flex-col gap-1">
                    <label className="text-g font-semibold" htmlFor="fullName">
                        Change User Name
                    </label>
                    <input 
                            required
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your name"
                            value={data.fullName}
                            onChange={handleInputChange}
                            className="bg-transparent px-2 py-1 border"
                        />
                </div>
                {/* update*/}
                <button 
                    disabled = {isLoading}
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 cursor-pointer text-lg"
                >
                    {isLoading? "Updating...": "Update"}
                </button>
                {/* back to profile page link */}
                <Link to = "/user/profile">
                    <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                        Back
                    </p>
                </Link>
            </form>
        </div>
    </HomeLayout>
  )
}
