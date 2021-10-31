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

module.exports = router;