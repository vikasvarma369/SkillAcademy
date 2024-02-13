import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState ={
    lectures: []
}

export const getCourseLecture = createAsyncThunk();

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: ()=>{
        
    }
})

export default lectureSlice.reducer 