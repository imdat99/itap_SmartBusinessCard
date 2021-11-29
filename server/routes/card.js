const express = require("express");
const router = express.Router();
const cards = require('../models/user/card')



// @route post api/auth
// @desc buy card
// @acces Public
router.get('/:id', async (req, res) => {
    try {
        const findCardId = await cards.findById(req.params.id)
        console.log(findCardId)
        if (findCardId) {
            res.json({ success: true, findCardId });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "Card not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})
// @route post api/auth
// @desc buy card
// @acces Public
router.post('/', async (req, res) => {
    const { title, type } = req.body;

    if (!title || !type) {
        return res.status(400).json({
            success: false,
            message: "Missing title or type",
        });
    }
    try {
        const newCard = new cards({ title, type });
        await newCard.save();
        res.json({
            success: true,
            message: "Card created Successfully",
            newCard,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router;