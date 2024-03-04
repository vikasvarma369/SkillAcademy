import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance"
const initialState = {
    courselist: []
}

// get all courses
export const getAllCourses = createAsyncThunk("/course/getAllCourses", async()=>{
    try {
        const response = await axiosInstance.get('/course');
        // console.log(response?.data?.message);
        toast.success(response?.data?.message)
        // console.log("responce: =>",response)
        return response
    } catch (error) {
        console.log("get all courrses error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

// create course 
export const createCourse = createAsyncThunk("/course/create", async(data)=>{
    try {
        // console.log("data: ",data)
        const response = await axiosInstance.post('/course', data);
        // console.log(response?.data?.message);
        toast.success(response?.data?.message)
        // console.log("responce: =>",response)
        return response
    } catch (error) {
        console.log("create course error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

// delete course
export const deleteCourse = createAsyncThunk("/course/delete", async(id)=>{
    try {
        const response = await axiosInstance.delete(`/course/${id}`);
        console.log("response : ",response )
        toast.success(response?.data?.message)
        return response
    } catch (error) {
        console.log("delete course error",error)
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

//update the course TODO: 
export const editCourse = createAsyncThunk("/course/edit", async(data)=>{
    try {
        console.log("edit course", data)
        console.log(data.title)
        console.log(data.id)
        const id = data.get("id")
        const response = await axiosInstance.put(`/course/${id}`, data);
        // toast.success(response?.data?.message)
        console.log("responce: =>",response)
        return response
    } catch (error) {
        console.log("edit course error",error)
        console.log(error);
        // toast.error(error?.response?.data?.message);
    }
})
const CourseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action?.payload){
                // console.log("action payload: =>", action?.payload?.data?.courses)
                state.courselist = action?.payload?.data?.courses
            }
        })
    }
});

export default CourseSlice.reducer;