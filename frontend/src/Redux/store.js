import { configureStore } from "@reduxjs/toolkit"
import AuthSliceReducer from "./Slices/AuthSlice.js"
import CourseSliceReducer from "./Slices/CourseSlice.js"
import RazorpaySliceReducer from "./Slices/RazorpaySlice.js"
import LectureSliceReducer from "./Slices/LectureSlice.js"
import StatSliceReducer from "./Slices/StatSlice.js"

 const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer,
        lecture: LectureSliceReducer,
        stat: StatSliceReducer
    },
    devTools: true
})

export default store