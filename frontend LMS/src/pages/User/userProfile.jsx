import React, { useEffect } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { cancelSubscription } from '../../Redux/Slices/razorpaySlice';
import { getUserData } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";

function userProfile() {

    const dispatch  = useDispatch();
    
    const userData = useSelector((state)=> state?.auth?.data)

    // const imgSrc = (userData?.avatar?.secure_url)? userData?.avatar?.secure_url : 
    // cancel subscription
    async function handleCancelSubscription(){
        try {
            const res = await dispatch(cancelSubscription())
            // console.log("res cancel subs", res)
            await dispatch(getUserData());  
            toast.success("Subscription cancel successfully")  
        } catch (error) {
            console.log("unsubscribe:",error)
            toast.error("Please Try Again latter..")
        }    
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    
                    {(userData?.avatar?.secure_url)? <img
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />:<FaUserCircle className='text-6xl m-auto' />}
                    
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>

                    <div className="grid grid-cols-2">
                        <p>Email: </p> <p>{userData?.email}</p>
                        <p>Role:  </p> <p>{userData?.role}</p>
                        <p>Subscription:  </p> <p> {userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/user/changepassword"
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Change password
                            </button>
                        </Link>
                        <Link 
                            to="/user/updateprofile"
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                            <button>
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {userData?.subscription?.status === "active" && (
                        <button 
                            onClick={handleCancelSubscription}
                            className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel subscription
                        </button>
                    )}
                </div>

            </div>
        </HomeLayout>
    )
}

export default userProfile