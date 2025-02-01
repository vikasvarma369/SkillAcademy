import { configDotenv } from 'dotenv';
// configaration
configDotenv();

// database connection
import connectToDb from "./database/db.config.js"
(async () => {
    await connectToDb();
  })();

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
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    )
)




// improt user route
import userRoutes from './routes/user.routes.js'; 

// import course route
import courseRoute from './routes/course.routes.js'

// import contactus route
import contractRoutes from './routes/contacts.routes.js'

// import payment route
import paymentRoutes from './routes/payment.routes.js'

// import admin stats route
import statsRoutes from './routes/allStatus.js'
// declaration
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/', contractRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use("/api/v1/admin",statsRoutes)



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