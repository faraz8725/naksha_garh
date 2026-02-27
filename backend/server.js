require("dotenv").config();
const app=require("./src/app.js");
const connectDB=require("./src/db/db");
const PORT=process.env.PORT || 3000;
connectDB();
app.listen(PORT,()=>{
  console.log(`Server is live on ${PORT}`);
})