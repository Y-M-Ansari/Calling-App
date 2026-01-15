import express from "express";

import {ENV} from "./lib/env.js"

console.log(ENV.PORT);

const app = express();

app.get("/", (req, res)=>{
   res.status(200).json({msg: "success from backend from server.js"});
})

app.listen(ENV.PORT, ()=> console.log("Server is running on port 3000"));