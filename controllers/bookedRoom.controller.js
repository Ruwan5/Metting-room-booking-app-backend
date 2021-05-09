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
    roomName: {
        type: String
    },


});

const BookedRoom = mongoose.model('BookedRoom', bookedroomSchema);

module.exports.addNewBookedRoom = (req, res, next) => {
    var bookedroom = new BookedRoom();

    bookedroom.name = req.body.name;
    bookedroom.email = req.body.email;
    bookedroom.createdTime = req.body.createdTime;
    bookedroom.img = req.body.img;
    bookedroom.date = req.body.date;
    bookedroom.time = req.body.time;
    bookedroom.roomName = req.body.roomName;


    // console.log(bookedroom.date);
    // console.log(bookedroom.time);


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{

            dbo.collection("bookedroom").find({roomName: bookedroom.roomName,  date: bookedroom.date, time: bookedroom.time}, {$exists: true}).toArray(function(err, doc) {

                // console.log(doc[0].date);
                if(doc[0]){
                    console.log(doc);

                    res.send(false);
                }
                else if(!doc[0]){
                    dbo.collection("bookedroom").insertOne(bookedroom, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");

                        db.close();
                    });
                    res.send(true);
                }

                db.close();
            });


            // res.send(true);
        }catch(err){
            console.log(err);
        }

    });

}

module.exports.getReleventBookedRooms = (req, res, next) => {


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    var bookedroom = new BookedRoom();

    bookedroom.email = req.body.email;

    console.log(bookedroom.email)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{
            dbo.collection("bookedroom").find({email: bookedroom.email}, {$exists: true}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
                db.close();
            });
        }catch(err){
            console.log(err);
        }

    });

}