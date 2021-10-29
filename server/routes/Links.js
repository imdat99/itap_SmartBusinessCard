require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const link = require("../models/user/links");
const profile = require("../models/user/profile");
const user = require("../models/users");


// @route Post api/Links
// @desc create link
// @access private
router.post("/", verifyToken, async (req, res) => {
    const { title, type, url, activated, gate, thumbnailImage } = req.body;

    // Simple valid
    if (!title && !type)
        return res
            .status(400)
            .json({ success: false, message: `title, index, url is require` });
    try {
        const allLinks = await link.find({ user_id: req.userId });
        const newLink = new link({
            title,
            index: allLinks.length,
            type: type || 'default',
            url:
                type === 'tel' ? url :
                    type === 'mail' ? url :
                        (url.startsWith("https://") ? url : `https://${url}`),
            gate,
            activated: true,
            thumbnailImage: thumbnailImage || 'default',
            user_id: req.userId,
        });

        await newLink.save();

        res.json({
            success: true,
            message: "Link created successfully",
            link: newLink
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @reoute get api/links
// @desc get all links of user
// @access private
router.get("/", verifyToken, async (req, res) => {
    try {
        const allLinks = await link.find({ user_id: req.userId });
        return res.json({ success: true, allLinks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route Put api/Links
// @desc update link
// @access private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, index, url, type, activated, gate, thumbnailImage } = req.body;

    // Simple valid
    try {
        let updatedLink = {
            title,
            index,
            type,
            gate,
            url: url ?
                (type === 'tel' ? url :
                    type === 'mail' ? url :
                        (url.startsWith("https://") ? url : `https://${url}`)) : url,
            activated,
            thumbnailImage
        };

        const linkUpdateCondition = { _id: req.params.id, user_id: req.userId }
        updatedLink = await link.findByIdAndUpdate(linkUpdateCondition, updatedLink, { new: true })

        // User not authorised to update post or link not found
        if (!updatedLink) {
            return res
                .status(401)
                .json({ success: false, message: 'User not authorised or link not found' })
        }
        res.json({
            success: true,
            message: "Updated",
            link: updatedLink,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// @route Delete api/Links
// @desc delete link
// @access private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const linkDeleteCondition = { _id: req.params.id, user_id: req.userId }
        const deleteLink = await link.findOneAndDelete(linkDeleteCondition)

        // User not authorised to update post or link not found
        if (!deleteLink) {
            return res
                .status(401)
                .json({ success: false, message: 'User not authorised or link not found' })
        }
        res.json({
            success: true,
            message: "Deleted",
            link: deleteLink,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})


module.exports = router;
