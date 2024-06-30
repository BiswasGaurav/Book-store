import express, { response } from "express";
import { PORT , MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//MiddleWire for CORS
//option 1 : Allow all origihs with default cors policy
// app.use(cors());
//option 2 : Allow specific origins
app.use(
    cors({
        origin : "https://localhost:3000" ,
        methods : ['GET' , 'POST' , 'PUT' , 'DELETE'] ,
        allowedHeaders : ['Content-Type']
    })
)

//MiddleWire for parsing request body
app.use(express.json())

app.get('/' , (req, res) => {
    console.log(req)
    return res.status(234).send(`Welcome to Mern Book Store`);
})

app.use('/books' , bookRoute)

mongoose.connect(MONGODB_URL).then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
        console.log("server is running on port PORT: ", PORT);
    });
}).catch((err) => console.log(err))