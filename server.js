import express from "express";
import noticeBoardRoute from "./routes/noticeBoardRoute.js"
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = 5000
const spec = swaggerJSDoc({
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Notice Board API",
            version:"1.0.0",
            description:"Create a Notice",
        },
        servers:[
            {
                url:process.env.BASE_URL
            }
        ]
    },
    apis: ["./routes/*.js"]

})

// middleware to accept json
app.use(express.json())

// middleware to accept body 
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.send("Server is running")
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec))
app.use("/api", noticeBoardRoute)

app.listen(PORT, (req, res)=>{
    console.log("Server is running on PORT", PORT);
})