const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const items = new Schema({

    name: {
        type: String,
    },
    quantity: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }

});

var Items = mongoose.model('items', items);
module.exports = Items;