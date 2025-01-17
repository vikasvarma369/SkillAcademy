import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { changePassword } from '../../Redux/Slices/AuthSlice';

export default function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // state 
    const [userPassword, setUserPassword] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false);

    // handle input change
    function handleInputChange(e){
        const {name, value} = e.target;
        setUserPassword({
            ...userPassword,
            [name]: value
        })
    }

    // handle form submit 
    async function handleFormSubmit(e){
        e.preventDefault()
        if(!userPassword.oldPassword && !userPassword.newPassword){
            toast.error("All fields are mandatory");
            return;
        }
        setIsLoading(true)
        await dispatch(changePassword(userPassword))
        setIsLoading(false)
        navigate("/user/profile")
    }

    

 return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[90vh]">
            <form 
                onSubmit={handleFormSubmit}
                noValidate
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
            >
                <h1 className="text-center text-3xl font-semibold text-yellow-400">
                        Change Password
                </h1>
                

                {/* change password section */}
                <div className="flex flex-col gap-1">
                    <label className="text-g font-semibold" htmlFor="oldPassword">
                        Old Password
                    </label>
                    <input 
                            required
                            type="text"
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter your Old Password"
                            value={userPassword.oldPassword}
                            onChange={handleInputChange}
                            className="bg-transparent px-2 py-1 border"
                        />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-g font-semibold" htmlFor="newPassword">
                        New Password
                    </label>
                    <input 
                            required
                            type="text"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter New Password"
                            value={userPassword.newPassword}
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
                      {isLoading ? "changing..." : "Change"}
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
