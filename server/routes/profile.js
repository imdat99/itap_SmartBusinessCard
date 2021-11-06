const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const link = require("../models/user/links");
const user = require("../models/users");
const profile = require("../models/user/profile");

// @route get api/profile
// @desc get profile
// @access public
router.get("/", verifyToken, async (req, res) => {
    try {
        const Profile = await profile.findOne({ user_id: req.userId });
        if (Profile) {
            return res.json({ success: true, Profile });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route Put api/page
// @desc update profile
// @access private

router.put('/', verifyToken, async (req, res) => {
    const { fullName, decription, avatar, cover } = req.body;

    try {
        let updatedProfile = {
            fullName, decription, avatar, cover
        };

        const profilepdateCondition = { user_id: req.userId }
        updatedProfile = await profile.findOneAndUpdate(profilepdateCondition, updatedProfile, { new: true })

        // User not authorised
        if (!updatedProfile) {
            return res
                .status(401)
                .json({ success: false, message: 'User not authorised' })
        }
        res.json({
            success: true,
            message: "Updated",
            Profile: updatedProfile,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;