const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['tel', 'mail', 'default']
    },
    url: {
        type: String,
        required: true
    },
    gate: { type: String, },
    activated: Boolean,
    thumbnailImage: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('links', linksSchema);