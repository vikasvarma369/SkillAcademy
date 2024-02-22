import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()
    // onFormSubmit
    const handleFormSubmit = async(event)=>{
        event.preventDefault()
        console.log(email)
        if(!email){
            toast.error("Email is required")
            return;
        }
        const res = await dispatch(forgotPassword(email))
        toast.success(res?.payload?.message)

        // reset the email value
        setEmail("")
    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form 
                    onSubmit={handleFormSubmit}
                    className='flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]'
                >
                    <h1 className="text-center text-2xl text-yellow-500 font-bold">Forgot Password</h1>

                    <p>
                        Enter your registered email, we will send you a verification link on
                        your registered email from which you can reset your password
                    </p>

                    {/* get details aread */}
                    <div className="flex flex-col gap-1">
                        <input 
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your registered email"
                            className="bg-transparent px-2 py-1 border"
                            value={email}
                            onChange={(event)=> setEmail(event.target.value)}
                         />
                    </div>
                    <button
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                        type="submit"
                    >
                        Get Verification Link
                    </button>
                    <p className="text-center">
                        Already have an account ?{" "}
                        <Link to={"/signin"} className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword