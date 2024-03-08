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
    bet: {
        type: Number,
        default: 0,
    },
    lastDaily: {
        type: Date,
        reqired: true,
    }
    }
);

module.exports = model('kickscoin', kicksCoinSchema);