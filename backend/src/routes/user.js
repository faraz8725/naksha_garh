const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyToken,
  verifyAdmin,
  upload,
  uploadMedia,
  getAllMedia,
  updateMedia,
  deleteMedia
} = require("../controllers/user");   // ⚠️ path check karo

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// MEDIA ROUTES
router.get("/allMedia", getAllMedia);

router.post(
  "/uploadMedia",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  uploadMedia
);

router.put(
  "/updateMedia/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  updateMedia
);

router.delete(
  "/deleteMedia/:id",
  verifyToken,
  verifyAdmin,
  deleteMedia
);

module.exports = router;