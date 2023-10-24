import express from "express"
import { PORT } from "./config.js"
import { mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import booksRoute from "./routes/bookRoutes.js"
import cors from "cors"

const app = express()

//Middleware for parsing request body 
app.use(express.json())

//Middleware for handling CORS POLICY 
//OPTION 1 / allow all origins with default of (*)

app.use(cors());

//OPTION 2 / Allow custom origin 
/*app.use(
    cors({
        origin:"",
        methods:['GET','POST','DELETE'],
        allowedHeaders:['Content-Type'],
    })
)*/

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send('welcome to mern stack project ')
})

app.use('/books',booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('app connected to database')    
        app.listen(PORT, ()=>{
        console.log(`app is listening to port ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error);
    })
