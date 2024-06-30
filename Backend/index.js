import express from "express";
import { PORT , MONGODB_URL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/' , (req, res) => {
    console.log(req)
    return res.status(234).send(`Welcome to Mern Book Store`);
})

app.listen(PORT, () => {
    console.log("server is running on port PORT: ", PORT);
});

mongoose.connect(MONGODB_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err))