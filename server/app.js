import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/error.middleware.js'
import morgan from 'morgan'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended: true,limit: "20kb"}))

app.use(cookieParser()) 


// morgon 
app.use(morgan('dev'));
// error middleware 
app.use(errorMiddleware);

export {app};