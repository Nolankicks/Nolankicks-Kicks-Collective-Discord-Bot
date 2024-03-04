const { Schema, model } = require('mongoose');

const kicksCoinSchema =  new Schema({
    userID: {
        type: String,
        reqired: true,
    },
    guildID: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        default: 0,
    },
});

module.exports = model('kickscoin', kicksCoinSchema);