import { configDotenv } from 'dotenv';
// configaration
configDotenv();

// db connection
import connectToDb from './config/db.config.js';
connectToDb();

import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
    cors(
        {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173'
        }
    )
)




// improt user route
import userRoutes from './routes/user.routes.js'; 

// import course route
import courseRoute from './routes/course.routes.js'
// declaration
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/course', courseRoute)



// health check
app.get('/health', (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "route health is good"
    })
})

app.all('*', (_req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
})

// error middleware
import errorMiddleware from './middleware/error.middleware.js';
app.use(errorMiddleware);

export default app;