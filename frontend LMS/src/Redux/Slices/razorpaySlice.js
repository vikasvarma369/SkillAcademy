import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: [],
}

// func to get api key 
export const getRazorPayId = createAsyncThunk("/razorPayId/get", async()=>{
    try {
        const responce = await axiosInstance.get("/payments/razorpay-key")
        console.log("key responce",responce)
        return responce
    } catch (error) {
        toast.error("Failed to load data");
    }
})

// func to purches course
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async()=>{
    try {
        const responce = axiosInstance.post("/payments/subscribe")
        console.log("bundle course: ", responce)
        return responce
    } catch (error) {
        console.log("purches func error msg: ",error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
    }
})

// func ispayment verified 
export const verifyUserPayment = createAsyncThunk("/verifyPayment", async(paymentDetails)=>{
    try {
        const responce = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: paymentDetails.razorpay_payment_id,
            razorpay_subscription_id: paymentDetails.razorpay_subscription_id,
            razorpay_signature: paymentDetails.razorpay_signature
        })

        console.log("verify payment response", responce)

        return responce
    } catch (error) {
        console.log("verify payment error:", error)
        // toast.error(error?.responce?.data?.message)
    }
})

// cancel subscription 
export const cancelSubscription = createAsyncThunk("/cancelSubscription", async()=>{
    try {
        const res = await axiosInstance.post("/payments/unsubscribe");
        console.log("unsubscripbe responce", res)
        // toast.success(response?.data?.message)
    } catch (error) {
        console.log("Error during unsubscribe: ", error)
        
    }
    return response
})

// get all payments record
// TODO: 

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled, (state, action)=>{
            state.key = action?.payload?.data?.key
        })
        .addCase(getRazorPayId.rejected, () => {
            toast.error("Failed to get razor pay id");
        })
        .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
            state.subscription_id = action?.payload?.data?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state, action) => {
            toast.success(action?.payload?.data?.message);
            state.isPaymentVerified = action?.payload?.data?.success
        })
        .addCase(verifyUserPayment.rejected, (state, action) => {
            toast.success(action?.payload?.data?.message);
            state.isPaymentVerified = action?.payload?.data?.success
        })
        // .addCase(cancelSubscription.fulfilled, (state, action)=>{
        //     toast.success(action?.payload?.data?.message);
        //     state.isPaymentVerified = !action?.payload?.data?.success
        // })
    }
})

export default razorpaySlice.reducer;