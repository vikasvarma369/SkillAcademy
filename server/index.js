import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay'
import { configDotenv } from "dotenv";

configDotenv();

// cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Razorpay payment gateway configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})


const PORT = process.env.PORT  || 3000 ;
app.listen(PORT, () => {
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
})
