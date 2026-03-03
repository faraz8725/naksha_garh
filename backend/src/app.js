const express=require("express");
const app=express();
app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
const userRoutes=require("./routes/user");

app.use("/api/user",userRoutes);

module.exports=app;