import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance"

const initialState = {
    allUserCount: 0,
    allSubscriberCount: 0
}

// get status record 
export const getStatusData = createAsyncThunk("adimn/stats", async()=>{
    try {
        const response = await axiosInstance.get("/admin/allstatus/users");
        console.log("admin stats", response)

        return response
    } catch (error) {
        console.log("fetching payments records error:", error)
    }
})

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getStatusData.fulfilled, (state, action)=>{
            state.allSubscriberCount = action?.payload?.data?.subscribedUsersCount ;
            state.allUserCount =  action?.payload?.data?.
            allUsersCount
        })

    }
})

export default statusSlice.reducer 