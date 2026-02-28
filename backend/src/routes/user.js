const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logoutUser,adminDashboard,
  verifyToken,verifyAdmin,uploadMedia,upload,}=require("../controllers/user");

router.post("/registerUser",registerUser);
router.post("/loginUser",loginUser);
router.post("/logoutUser",logoutUser);

router.get("/adminDashboard", verifyToken, verifyAdmin, adminDashboard);
router.post(
  "/uploadMedia",verifyToken,verifyAdmin, upload.single("image"),uploadMedia
);
module.exports=router;  