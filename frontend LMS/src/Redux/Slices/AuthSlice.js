import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from 'react-hot-toast'
import axiosInstance from "../../config/axiosInstance"
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}
// first parameter tell as what is async thunk and the second parameter is a call back function in call back we declare the delay task
export const createAccount = createAsyncThunk("/auth/signup", async(data)=>{
    try {
        const responce = await axiosInstance.post('/user/register', data);
        // axios promise
        console.log("responce:" , responce)
        toast.promise(responce,{
            loading: 'Wait creating account',
            success: (data)=>{
                console.log("data",data)
                return data?.data?.message
            },
            error: "Faild to create account, Try again"
        })
        return responce
    } catch (error) {
        console.log("create Account error",error)
        toast.error(error?.response?.data?.message)
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;