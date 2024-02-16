import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance"
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}
// first parameter tell as what is async thunk and the second parameter is a call back function in call back we declare the delay task

// create account
export const createAccount = createAsyncThunk("/auth/signup", async(data)=>{
    try {
        const response = await axiosInstance.post('/user/register', data);
        // console.log(response?.data?.message);
        toast.success(response?.data?.message)
        // console.log("responce: =>",response)
        return response
    } catch (error) {
        // console.log("create Account error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

// login 
export const login = createAsyncThunk("/auth/signin", async(data)=>{
    try {
        const response = await axiosInstance.post('/user/login', data);
        // console.log("login response data message:",response?.data?.message);
        toast.success(response?.data?.message)
        // console.log(" login responce: =>",response)
        return response
    } catch (error) {
        console.log("login error",error)
        toast.error(error?.response?.data?.message);
    }
})

// logout
export const logout = createAsyncThunk("/auth/logout", async()=>{
    try {
        const response = await axiosInstance.get('/user/logout');
        toast.success(response?.data?.message)
        return response
    } catch (error) {
        console.log("logout error",error)
        toast.error(error?.response?.data?.message);
    }
})

// get user data
export const getUserData = createAsyncThunk("/auth/user/profile", async ()=>{
    const responce = await axiosInstance.get("/user/me");
    console.log("get responce",responce)
    return responce
})

// update profile details
export const updateProfile = createAsyncThunk("/auth/user/updateprofile", async (data)=>{
    const response = await axiosInstance.put(`/user/update/${data[0]}`, data[1]);
    toast.success(response?.data?.message)
    console.log("update profle responce data", response.data)
    return response.data
})

// .... Change Password
export const changePassword = createAsyncThunk("/auth/user/changepassword", async (data)=>{
    const response = await axiosInstance.put("/user/change-password", data);
    toast.success(response?.data?.message)
    console.log("change password responce data", response.data)
    return response.data
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled, (state, action) => {
            console.log("action data in login case:", action)
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("role", action?.payload?.data?.user?.role)
            localStorage.setItem("data", JSON.stringify(action?.payload?.data))
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role
            state.data = action?.payload?.data
        })
        .addCase(logout.fulfilled, (state, action)=>{
            localStorage.clear()
            state.isLoggedIn = false,
            state.role = ''
            state.data = {}
        })
        .addCase(getUserData.fulfilled, (state, action)=>{
            console.log("action data in get user data  case:", action)
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("role", action?.payload?.data?.user?.role)
            localStorage.setItem("data", JSON.stringify(action?.payload?.data))
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role
            state.data = action?.payload?.data
        })
    }
});

export default authSlice.reducer;