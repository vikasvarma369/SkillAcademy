import { configureStore } from "@reduxjs/toolkit";
// imports reducers
import authReducer from './Slices/AuthSlice.js';
import courseReducer from './Slices/CourseSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;