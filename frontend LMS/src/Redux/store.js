import { configureStore } from "@reduxjs/toolkit";
// imports reducers
import authReducer from './Slices/AuthSlice.js';
import courseReducer from './Slices/CourseSlice.js'
import lectureReducer from './Slices/lectureSlice.js'
import razorpayReducer from './Slices/razorpaySlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        lecture: lectureReducer,
        razorpay: razorpayReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;