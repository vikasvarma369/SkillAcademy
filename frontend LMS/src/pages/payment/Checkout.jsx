import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import HomeLayout from '../../layouts/HomeLayout'
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/razorpaySlice';

function Checkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const razorPayKey = useSelector((state)=> state.razorpay.key)
    const subscription_id = useSelector((state)=> state.razorpay.subscription_id)
    const userData = useSelector((state)=> state.auth.data)

    const { isPaymentVerified } = useSelector((state)=> state.razorpay)

    // for storing the payment details after successfull transaction
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    }

    // handle subscription
    function handleSubscription(e){
        e.preventDefault()
        if(!razorPayKey || !subscription_id){
            return;
        }
        //creating a option object
        const options = {
            key: razorPayKey,
            subscription_id: subscription_id,
            name: "crusify Pvt. Ltd.",
            description: "subscription",
            prefill: {
                name: userData?.fullName,
                email: userData?.email,
              },
            // if payment done so razorpay call this handler function
            handler: async function(responce){
                console.log("razorpay response: ", responce)
                paymentDetails.razorpay_payment_id = responce.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = responce.razorpay_subscription_id;
                paymentDetails.razorpay_signature = responce.razorpay_signature;

                // success message 
                toast.success("Payment successful")

                // verify the payment
                const res = await dispatch(verifyUserPayment(paymentDetails))
                console.log("res", res)

                !isPaymentVerified ? navigate("/checkout/success") :
                ("/checkout/fail")
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    useEffect(() => {
        // iife func for page first load
        (async () => {
          await dispatch(getRazorPayId());
          await dispatch(purchaseCourseBundle());
        })();
      }, []);
return (
    <HomeLayout>
        {/* container */}
        <form 
            onSubmit={handleSubscription}
            className="min-h-[90vh] flex items-center justify-center text-white"
            >
            {/* card */}
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                Subscription Annual Plain
                </h1>

                <div className="px-4 space-y-5 text-center">
                    <p className="text-[17px]">
                        This purchase will allow you to access all the available courses
                        of our platform for{" "}
                        <span className="text-yellow-500 font-bold">1 Year Duration</span>
                        . <br />
                        All the existing and new launched courses will be available to you
                        in this subscription bundle
                    </p>
                    <p 
                        className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500"
                    >
                        <BiRupee /> <span>9999</span>only
                    </p>
                    <div 
                    className="text-gray-200"
                    >
                        <p>100% refund at cancellation</p>
                        <p>* Terms & Condition Applied</p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
                >
                    Buy Now
                </button>
            </div>
            </form>
    </HomeLayout>
)
}

export default Checkout