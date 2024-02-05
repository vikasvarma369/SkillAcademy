import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';


// cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})