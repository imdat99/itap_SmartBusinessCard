const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    fullName: String,
    decription: String,
    avatar: String,
    cover: String,
    card: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('profile', profileSchema);