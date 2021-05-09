const mongoose = require('mongoose');


var bookedroomSchema = new mongoose.Schema({
    date: {
        type: String
    },
    time: {
        type: String

    },
    name: {
        type: String

    },
    email: {
        type: String
    },
    createdTime: {
        type: String
    },
    img: {
        type: String
    },


});

mongoose.model('Room', bookedroomSchema);