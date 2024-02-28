import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { isPasswordValid } from '../../validators/validator'
import { resetPassword } from '../../Redux/Slices/AuthSlice'
import toast from 'react-hot-toast'
function ResetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    password: '',
    cnfPassword: '',
    resetToken: useParams().resetToken
  })
  const [isLoading, setIsLoading] = useState(false);

  // handle user input 
  const handleUserInput = (event)=>{
    const {name,value} = event.target;
    const newData = {
      ...data,
      [name]: value
    }
    setData(newData);
  }

  // handle form submit
  const handleFormSubmit = async(e)=>{
    e.preventDefault()

    if (!data.password || !data.cnfPassword || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    // password strength check
    // if (!isPasswordValid(data.password)) {
    //   toast.error(
    //     "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
    //   );
    //   return;
    // }
    // compare the both password
    if(data.password !== data.cnfPassword){
      toast.error("Both password should be same");
      return;
    }
    setIsLoading(true)

    // reset password 
    const res = await dispatch(resetPassword(data))

    console.log("reset password res",res)

    // navigate to login 
    if(res?.payload?.success){
      setIsLoading(false)
      navigate('/signin')
    }
  }
  // console.log("data values",data)
  return (
    <div
        className="flex items-center justify-center h-[100vh]"
      >
        {/* forget password card */}
        <form 
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold text-yellow-500">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="password">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="cnfPassword">
              Confirm
            </label>
            <input
              required
              type="password"
              name="cnfPassword"
              id="cnfPassword"
              placeholder="Confirm your password"
              className="bg-transparent px-2 py-1 border"
              value={data.cnfPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            disabled = {isLoading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
          {isLoading ? "Reseting...":"  Reset"}
          </button>
        </form>
      </div>
  )
}

export default ResetPassword