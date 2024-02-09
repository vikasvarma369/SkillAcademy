import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance"
const initialState = {
    courselist: []
}

export const getAllCourses = createAsyncThunk("/course/allcourses", async(data)=>{
    try {
        const response = await axiosInstance.post('/course', data);
        console.log(response?.data?.message);
        toast.success(response?.data?.message)
        console.log("responce: =>",response)
        return response
    } catch (error) {
        console.log("cget all courrses error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

const CourseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: ()=>{
        
    }
});

export default CourseSlice.reducer;