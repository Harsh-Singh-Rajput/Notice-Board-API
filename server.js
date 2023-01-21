import express from "express";
import noticeBoardRoute from "./routes/noticeBoardRoute.js"

const app = express()
const PORT = 5000

// middleware to accept json
app.use(express.json())

// middleware to accept body 
app.use(express.urlencoded({extended:true}))

app.use("/api", noticeBoardRoute)

app.listen(PORT, (req, res)=>{
    console.log("Server is running on PORT", PORT);
})