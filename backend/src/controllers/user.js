/*const express=require("express");
const cors=require("cors");
const User=require("../models/user");
const bcrypt = require("bcrypt");

const registerUser =async(req,res)=>{
  const {name,email,password}=req.body;
const hashed = await bcrypt.hash(password, 10);
  const isAlreadyExists=await User.findOne({email});
  if(isAlreadyExists){
    return res.status(400).json({message:"User already exists"});
  }
  const newUser=await User.createOne({name,email,password:hashed});
  res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  
}
module.exports={registerUser}; */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ImageKit = require("imagekit");
const multer = require("multer");


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const isAlreadyExists = await User.findOne({ email });
    if (isAlreadyExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 2️⃣ Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashed
    });

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,   // make sure .env me set ho JWT_SECRET
      { expiresIn: "1h" }
    );

    // 5️⃣ Send response
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/*const loginUser = async (req, res) => {
try{
  const{email,password}=req.body;
  const user=await User.findOne({email});
  if(!user){
    return res.status(200).json({message:"User not found"});
  }
  const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Send response
    res.status(404).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
  */
 const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
         email: user.email,
          role: user.role 
         },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    // 4️⃣ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role 
      }
      
    });
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
  
};
const logoutUser = (req, res) => {
  // Stateless JWT → sirf response bhejte hain
  res.status(200).json({ message: "Logout successful. Please delete the token on client side." });
};
const adminDashboard = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    message: "Welcome Admin",
    totalUsers: users.length,
    users
  });
};
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Token required" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
const upload = multer({ storage: multer.memoryStorage() });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
const uploadMedia = async (req, res) => {
  try {
    console.log("Content-Type:", req.headers["content-type"]);
console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    res.status(200).json({
      message: "Upload successful",
      url: response.url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};



  
module.exports = { registerUser ,loginUser,logoutUser, adminDashboard,
  verifyToken,
  verifyAdmin,upload,uploadMedia
};   