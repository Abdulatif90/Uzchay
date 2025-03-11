import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app"
dotenv.config();


mongoose
    .connect(process.env.MONGO_URL as string,{})
    .then((data)=>{
        console.log("MongoDb was connected sucessfully");
        const PORT = process.env.PORT ?? 3003;
        app.listen(PORT, () => {
            console.log(`Server is successfully running on port: ${PORT}`)
        })
    })
    .catch((err) => console.log("Error on connection MongoDb", err ));
