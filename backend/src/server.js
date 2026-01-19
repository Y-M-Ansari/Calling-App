import express from "express";
import {ENV} from "./lib/env.js"
import path from 'path';
import { connectDB } from "./lib/db.js";

const app = express();

// resolve() function returns absolute path
const __dirname = path.resolve();
console.log("absolutepath -->" ,__dirname);
app.get("/", (req, res)=>{
   res.status(200).json({msg: "success from backend from server.js"});
})

// combine the frontend and backend 
if(ENV.NODE_ENV === 'production'){
   app.use(express.static(path.join(__dirname, "../frontend/dist")));
   
   app.get("/{*any}", (req, res)=>{
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   });
}

const startServer = async () => {
   try{
      await connectDB();
      app.listen(ENV.PORT, ()=> console.log(`Server is running on port ${ENV.PORT}`));
   }catch(error){
      console.error("Error starting the server", error);
   }
}

startServer();