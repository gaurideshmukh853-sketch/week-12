const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        fs.unlinkSync(req.file.path); // delete local file

        res.json({ url: result.secure_url });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;