const mongoose = require('mongoose');


var roomSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String

    },
    location: {
        type: String

    },
    img: {
        type: String
    },


});

mongoose.model('BookedRoom', roomSchema);