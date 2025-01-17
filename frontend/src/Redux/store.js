import { configureStore } from "@reduxjs/toolkit";
// imports reducers
import authReducer from './Slices/AuthSlice.js';
import courseReducer from './Slices/CourseSlice.js'
import lectureReducer from './Slices/lectureSlice.js'
import razorpayReducer from './Slices/razorpaySlice.js'
import statusReducer from './Slices/statusSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        lecture: lectureReducer,
        razorpay: razorpayReducer,
        status: statusReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;