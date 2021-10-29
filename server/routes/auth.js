require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const Users = require("../models/users");
const Profile = require("../models/user/profile");


// @route Get api/auth
// @desc Check if user is logged in
// @acces Public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await Users.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.json({ success: true, user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

})


// @route Post api/auth/register
// @desc Register user
// @acces Public
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username or password",
        });
    }

    try {
        // check exitsting user
        const user = await Users.findOne({ username });
        if (user)
            return res.status(400).json({
                success: false,
                message: "Username is Used",
            });
        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new Users({ username, password: hashedPassword });
        await newUser.save();

        // create profile
        const newProfile = new Profile({
            fullName: "",
            decription: "",
            avatar: "default",
            cover: "default",
            user_id: newUser._id,
        });
        await newProfile.save();
        // return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESTOKEN_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "User created Successfully",
            accessToken,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route Post api/auth/login
// @desc login user
// @access Public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username or password",
        });
    }

    try {
        // Check for exitsting user
        const user = await Users.findOne({ username });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        //all good
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESTOKEN_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Login Successfully",
            accessToken,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
