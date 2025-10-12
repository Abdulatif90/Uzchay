import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env" 
});

import mongoose from "mongoose";
import app from "./app";
import path from "path";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB Connection succeed");
    const PORT = process.env.PORT;
    app.listen(PORT, function() {
        console.log(`This server is running successfully on port: ${PORT} http://localhost:${PORT}/`)
        console.info(`This server is running successfully on port: ${PORT} http://localhost:${PORT}/Admin`);
    })
  })
  .catch((err) => {
    console.log("ERROR on Connection to MongoDB", err);
  });