import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance"
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}
// first parameter tell as what is async thunk and the second parameter is a call back function in call back we declare the delay task
export const createAccount = createAsyncThunk("/auth/signup", async(data)=>{
    try {
        const response = await axiosInstance.post('/user/register', data);
        console.log(response?.data?.message);
        toast.success(response?.data?.message)
        console.log("responce: =>",response)
        return response
    } catch (error) {
        console.log("create Account error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;