import dotenv from 'dotenv'
import connetToDb from "./DbConfig/db.js";
import { app } from './app.js';

//config dotenv file
dotenv.config({
    path: './.env' 
})

const PORT = process.env.PORT || 8000

//connect to the database 
connetToDb() 
.then(()=>{
    app.on("error", (error)=>{
        console.log("Error", error)
        throw error;
    })
    app.listen(PORT, ()=>{
        console.log(`server is running at http://localhost:${PORT}`)
    })
})
.catch((err)=> {
    console.log("Mongo Db connection failed!!!", err)
})