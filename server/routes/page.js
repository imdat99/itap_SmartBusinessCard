const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const link = require("../models/user/links");
const user = require("../models/users");
const profile = require("../models/user/profile");

// @route get api/page/username
// @desc get all page
// @access public
router.get("/:code", async (req, res) => {
    try {
        const username = req.params.code
        const findUserId = await user.findOne({ username });
        if (findUserId) {
            const allLinks = await link.find({ user_id: findUserId._id, activated: true });
            const Profile = await profile.findOne({ user_id: findUserId._id });
            if (allLinks) {
                // const findUserId = await user.findOne({ username });
                res.json({ success: true, username, Profile, allLinks });
            } else {
                return res.json({ success: true, username, Profile, allLinks });
            }
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
            link: updatedProfile,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;