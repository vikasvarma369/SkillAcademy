import { configureStore } from "@reduxjs/toolkit";
// imports reducers
import authReducer from './Slices/AuthSlice.js';
import courseReducer from './Slices/CourseSlice.js'
import lectureReducer from './Slices/lectureSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        lecture: lectureReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;