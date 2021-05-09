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

const Room = mongoose.model('Room', roomSchema);

module.exports.addNewRoom = (req, res, next) => {
    var room = new Room();

    room.name = req.body.name;
    room.description = req.body.description;
    room.location = req.body.location;
    room.img = "http://cdn.shopify.com/s/files/1/0263/9491/8957/products/P1030-1_grande.jpg?v=1594218712";

    console.log(req.body)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{
            dbo.collection("room").insertOne(room, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");

                db.close();
            });
            res.send(true);
        }catch(err){
            console.log(err);
        }

    });

}


module.exports.getAllRooms = (req, res, next) => {


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{
            dbo.collection("room").find({}).toArray(function(err, result) {
                if (err) throw err;
                // console.log(result);
                res.send(result);
                db.close();
            });
        }catch(err){
            console.log(err);
        }

    });

}


module.exports.getRoomsById = (req, res, next) => {
    var room = new Room();
    // const {ObjectId} = require('mongodb');
    room.name =  req.body.name;
    console.log(req.body);
    // console.log(req);
    // var roomId = "\"" + room._id + "\"";
    // rmid = '60963f6974e89a3aa837280b';
    // console.log(room._id);
    // console.log(roomId)
    // console.log(rmid)

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{
            dbo.collection("room").find({name: room.name}, {$exists: true}).toArray(function(err, result) {

                console.log(result)
                res.send(result);
                db.close();
            });
        }catch(err){
            console.log(err);
        }

    });

}