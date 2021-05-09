const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const MeetingRoom = require('../controllers/room.controller');
const BookedMeetingRoom = require('../controllers//bookedRoom.controller');



router.post('/register', ctrlUser.register);

router.post('/login', ctrlUser.login);

router.post('/newroom', MeetingRoom.addNewRoom);

router.get('/getrooms', MeetingRoom.getAllRooms);

router.post('/getroombyid', MeetingRoom.getRoomsById);

router.post('/bookroom', BookedMeetingRoom.addNewBookedRoom);

router.post('/getbookedrooms', BookedMeetingRoom.getReleventBookedRooms);

module.exports = router;
