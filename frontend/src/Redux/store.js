import { configureStore } from "@reduxjs/toolkit"
import AuthSliceReducer from "./slices/authSlice.js"
import CourseSliceReducer from "./slices/courseSlice.js"
import RazorpaySliceReducer from "./slices/razorpaySlice.js"
import LectureSliceReducer from "./slices/lectureSlice.js"
import StatSliceReducer from "./slices/statSlice.js"

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