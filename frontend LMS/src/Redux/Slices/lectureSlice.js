import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from 'react-hot-toast'
const initialState ={
    lectures: []
}

// ........get course lecture
export const getCourseLecture = createAsyncThunk("/course/lecture/get", async(cid)=>{
    try {
        const response = await axiosInstance.get(`/course/${cid}`)
        console.log("get lecture: response:", response)
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error

    }
});

// add course lecture 
export const addCourseLecture = createAsyncThunk("/course/lecture/add", async(data)=>{
    try {
        const formData = new FormData()
        formData.append("lecture", data.lecture)
        formData.append("title", data.title)
        formData.append("description", data.description)
        const response = await axiosInstance.post(`/course/${data.id}`)
        console.log("post lecture: response:", response)
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error

    }
});


// delete course lecture
export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async(data)=>{
    try {
        const response = await axiosInstance.delete(`/course/${data.courseId}&lextureId=${data.lectureId}`)
        console.log("post lecture: response:", response)
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error

    }
});

// 

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCourseLecture.fulfilled, (state, action)=>{
            console.log("get course lecture state : ", action?.payload?.lectures)
            state.lectures = action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled, (state, action)=>{
            console.log("add lecture course state : ",action?.payload?.course?.lecture)
            state.lectures = action?.payload?.course?.lecture
        })
        .addCase(deleteCourseLecture.fulfilled, (state, action)=>{
            console.log("delete course state : ",action?.payload)
            state.lectures = action?.payload
        })
    }
})

export default lectureSlice.reducer 