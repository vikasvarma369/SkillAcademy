import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allUserCount: 0,
    allSubscriberCount: 0
}

// get status record 
// TODO: 

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {},
    extraReducers: ()=>{

    }
})

export default statusSlice.reducer 