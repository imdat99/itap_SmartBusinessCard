require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const nodemailer = require('nodemailer');

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

// @route put api/auth
// @desc change password
// @acces private
router.put("/", verifyToken, async (req, res) => {
    const { oldpass, newpass } = req.body;

    // Simple valid
    try {
        const user = await Users.findOne({ _id: req.userId });
        const passwordValid = await argon2.verify(user.password, oldpass);
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        const hashedPassword = await argon2.hash(newpass);
        let updatedpass = { password: hashedPassword }
        updatedpass = await Users.findByIdAndUpdate({ _id: req.userId }, updatedpass, { new: true })

        // User not authorised to update post or link not found
        if (!updatedpass) {
            return res
                .status(401)
                .json({ success: false, message: 'User not authorised or link not found' })
        }
        res.json({
            success: true,
            message: "Updated",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

})

// @route put api/auth/reset
// @desc reset password
// @acces private
router.put("/reset", verifyToken, async (req, res) => {
    const { pwd } = req.body;
    // Simple valid
    try {
        const hashedPassword = await argon2.hash(pwd);
        let updatedpass = { password: hashedPassword }
        updatedpass = await Users.findByIdAndUpdate({ _id: req.userId }, updatedpass, { new: true })
        // User not authorised to update post or link not found
        if (!updatedpass) {
            return res
                .status(401)
                .json({ success: false, message: 'User not authorised or link not found' })
        }
        res.json({
            success: true,
            message: "Updated",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

})

// @route Post api/auth/register
// @desc Register user
// @acces Public
router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;

    // console.log(email);
    // console.log(username);
    // console.log(password);
    if (!email || !username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username or password",
        });
    }

    try {
        // check exitsting user
        const user = await Users.findOne({ username });
        const Uemail = await Users.findOne({ email });
        if (user)
            return res.status(400).json({
                success: false,
                message: "Username is Used",
            });
        if (Uemail)
            return res.status(400).json({
                success: false,
                message: "Email is Used",
            });
        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new Users({ email, username, password: hashedPassword });
        await newUser.save();

        // create profile
        const newProfile = new Profile({
            fullName: "",
            decription: "",
            avatar: "default",
            cover: "default",
            card: 'null',
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
        let user
        if (~username.indexOf('@')) {
            user = await Users.findOne({ email: username });
        }
        else {
            user = await Users.findOne({ username });
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            });
        }


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


// @route Post api/auth/forgotpw
// @desc forgot password
// @access Public
router.post("/forgotpw", async (req, res, next) => {
    const { username } = req.body
    try {
        let user
        if (~username.indexOf('@')) {
            user = await Users.findOne({ email: username });
        }
        else {
            user = await Users.findOne({ username });
        }
        console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered",
            });
        }
        const accessToken = jwt.sign(
            {
                userId: user._id
            },
            process.env.ACCESTOKEN_TOKEN_SECRET,
            {
                expiresIn: '15m'
            }
        );
        const encodeEmail = (email) => {
            const aa = email.split('@')
            const len = aa[0].length - 1
            let enc = aa[0][0]
            for (var i = 1; i < 3; i++) {
                enc += '*'
            }
            enc += aa[0][len]
            aa[0] = enc
            return aa.join('@')
        }
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'phieubengao@gmail.com',
                pass: 'geqdeynowturpgut'
            }
        });

        let mailOptions = {
            from: 'phieubengao@gmail.com',
            to: user.email,
            subject: 'Reset Itap password',
            text: `Click this link to reset password: http://localhost:3000/forgot/${accessToken}`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.json({
                    success: true,
                    message: `Reset password link has been send to ${encodeEmail(user.email)}`,
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
})
module.exports = router;
