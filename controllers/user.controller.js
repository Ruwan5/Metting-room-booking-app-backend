const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = "user";
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.login = (req, res, next) => {
    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;


    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ruwan_5:ruwan5@cluster0.yhyxr.mongodb.net/bookingDB";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bookingDB");

        try{


            dbo.collection("users").find({email: user.email}, {$exists: true}).toArray(function(err, doc) {

                console.log(doc);
                if(doc[0]){
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, doc[0]["saltSecret"], (err, hash) => {

                            console.log(hash)

                            if(hash == doc[0]['password'] ){

                                res.send(doc);

                            }
                            else{
                                res.send(false);
                            }

                        });
                    });
                }
                else if(!doc[0]){
                    res.send(false);
                }




                db.close();
            });
        }catch(err){
            console.log(err);
        }

    });

}
