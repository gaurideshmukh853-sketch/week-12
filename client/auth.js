const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy user (replace with DB)
let users = [];

// Register
router.post("/register", async(req, res) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });

    res.json({ message: "User registered" });
});

// Login
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).send("Invalid password");

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

    res.json({ token });
});

module.exports = router;