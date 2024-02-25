import React, { useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { getUserData } from "../../Redux/Slices/AuthSlice";

const CheckoutFail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async()=>{
    await dispatch(getUserData())
    navigate("/checkout")
  }
  return (
    <HomeLayout>
      {/* container for checkout fail card  */}
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        {/* card to display message */}
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Payment failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <p className="text-center">
              <h2 className="text-lg font-semibold">
                Oops! Your Payment Failed
              </h2>
              Please try it again as it can be a temporary issue.
            </p>

            {/* adding the check symbol */}
            <RxCrossCircled className="text-5xl text-red-500" />

            <p>Failed</p>
          </div>

          {/* going back to payment page again */}
            <button 
             type="button"
             onClick={handleClick}
             className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg">
              Revisit Payment
            </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFail;
