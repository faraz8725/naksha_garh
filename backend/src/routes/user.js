const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logoutUser}=require("../controllers/user");

router.post("/registerUser",registerUser);
router.post("/loginUser",loginUser);
router.post("/logoutUser",loginUser);

module.exports=router;