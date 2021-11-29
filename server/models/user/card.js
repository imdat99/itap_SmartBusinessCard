const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('cards', CardSchema);