

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const ImageKit = require("imagekit");

const User = require("../models/User");
const Media = require("../models/Media");


// ===============================
// 🔐 AUTH CONTROLLERS
// ===============================

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: "user" // default role
    });

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

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

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
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




const upload = multer({
  storage: multer.memoryStorage()
});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});




// UPLOAD MEDIA
const uploadMedia = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname
    });

    const savedMedia = await Media.create({
      title,
      description,
      imageUrl: response.url,
      uploadedBy: req.user.id
    });

    res.status(201).json({
      message: "Upload successful",
      media: savedMedia
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};


// GET ALL MEDIA
const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .sort({ createdAt: -1 });

    res.status(200).json(media);

  } catch (err) {
    res.status(500).json({ message: "Error fetching media" });
  }
};


// UPDATE MEDIA
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    let updatedData = { title, description };

    if (req.file) {
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname
      });

      updatedData.imageUrl = response.url;
    }

    const updated = await Media.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Updated successfully",
      media: updated
    });

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};


// DELETE MEDIA
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    await Media.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};



module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  verifyAdmin,
  upload,
  uploadMedia,
  getAllMedia,
  updateMedia,
  deleteMedia
};