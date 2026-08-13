// import 'dotenv/config'; my first searched way and below from the example
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()
// connectDB()

if(process.env.NODE_ENV !== "production") {
app.use(
    cors({
        origin: "http://localhost:5173"
    }));
 }
 
// middleware to parse json body
app.use(express.json())


// custom middleware
// app.use((req,res, next)=>{
//     console.log(`Request method is: ${req.method} and URL is: ${req.url}`);
//     next()
// })

app.use(rateLimiter)



app.use("/api/notes", notesRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
  
    app.get("*", (req,res)=>{
     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
       })
}
connectDB().then(()=>{
    
app.listen(PORT, ()=>{
    console.log("Server running at Port: ", PORT);
    
})
})

