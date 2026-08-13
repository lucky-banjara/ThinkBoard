// import 'dotenv/config'; my first searched way and below from the example
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000
// connectDB()


app.use(
    cors({
        origin: "http://localhost:5173"
    }));
// middleware to parse json body
app.use(express.json())


// custom middleware
// app.use((req,res, next)=>{
//     console.log(`Request method is: ${req.method} and URL is: ${req.url}`);
//     next()
// })

app.use(rateLimiter)



app.use("/api/notes", notesRoutes)

connectDB().then(()=>{
    
app.listen(PORT, ()=>{
    console.log("Server running at Port: ", PORT);
    
})
})

