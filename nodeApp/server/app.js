var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

//const {MongoConnection} = require("./mongoDB/mongoAccess");

var publicPath = path.resolve(__dirname, '../public/');

app.use(express.static(publicPath))

app.get('/', function (req, res) {
    res.send('index.html', { root: publicPath });
});

const uri = "mongodb+srv://nhojrekrap:CLownfish23!@partyvibes-r4e8r.mongodb.net/";

MongoClient.connect(uri, { useNewUrlParser: true })
.then(client => {
    io.on('connection', function (socket) {
        console.log("connected");
        const rooms = client.db("PartyBase").collection("Rooms");   

        socket.on('createRoom', function(roomCode, callbackFunction){
            //console.log("1");
            createRoom(rooms, roomCode, socket, callbackFunction);
        });

        socket.on('joinRoom', function(roomCode, username, callbackFunction){
            //console.log("2");
            joinRoom(rooms, roomCode, username, socket, io, callbackFunction);
        });

        socket.on('rejoinRoom', function(roomCode, username, callbackFunction){
            //console.log("3");
            rejoinRoom(rooms, roomCode, username, socket, io, callbackFunction);
        });

        socket.on('downvote', function(roomCode, username, trackId, callbackFunction){
            //console.log("4");
            downvote(rooms, roomCode, username, trackId, io, callbackFunction);
        });

        socket.on('upvote', function(roomCode, username, trackId, callbackFunction){
            //console.log("5");
            upvote(rooms, roomCode, username, trackId, io, callbackFunction);
        });

        socket.on('addTrack', function(roomCode, username, trackData, callbackFunction){
            //console.log("6");
            addTrack(rooms, roomCode, username, trackData, io, callbackFunction);
        });

        socket.on('error', function (err) {
            console.log('received error from client:', socket.id)
            console.log(err);
        })
    });     
})
.catch(err => {
    console.log(err);
    client.close();  
});
        

    //client.on('join', handleJoin)

    //client.on('leave', handleLeave)

    //client.on('message', handleMessage)

    //client.on('chatrooms', handleGetChatrooms)

    //client.on('availableUsers', handleGetAvailableUsers)

    // client.on('disconnect', function () {
    //     console.log('client disconnect...', client.id)
    //     handleDisconnect()
    // })


function createRoom(rooms, roomCode, socket, callbackFunction) {
    rooms.insertOne({_id: roomCode, userCount: 0}, {writeConcern: {w: 1}})
        .then(result => {
            if (result) {
                console.log("room created: " + roomCode);
                socket.join(roomCode);
                return callbackFunction({code: "ROOM_CREATED", roomCode});
            }
        })
        .catch(err => {
            console.log(err);
            return callbackFunction({code: "ROOM_EXISTS"});
        });
}

function joinRoom(rooms, roomCode, username, socket, io, callbackFunction) {
    rooms.findOneAndUpdate(
        {_id: roomCode, users: {$nin: [{username}]}}, 
        {
            $push: {users: {username}},
            $inc: {userCount: 1}
        },
        {
            writeConcern: {w:1},
            returnOriginal: false
        })
        .then(response => {
            if (response.lastErrorObject.updatedExisting) {
                console.log("joined room");
                socket.join(roomCode);
                io.to(roomCode).emit("message", {roomData: response.value, action: "JOINED_ROOM"});
                return callbackFunction({code: "JOINED_ROOM", roomCode, username, roomData: response.value});
            }
            else {
                console.log("exists");
                return callbackFunction({code: "USER_EXISTS", roomCode, username, response});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function rejoinRoom(rooms, roomCode, username, socket, io, callbackFunction) {

    // if username = null check
    rooms.findOne(
        {_id: roomCode, users: {$in: [{username}]}}, 
        {
            writeConcern: {w:1},
        })
        .then(response => {           
            if (!!response) {
                console.log("rejoined room");
                socket.join(roomCode);
                //io.to(roomCode).emit("message", {roomData: response.value, action: "REJOINED_ROOM"});
                return callbackFunction({code: "REJOINED_ROOM", roomCode, username, roomData: response.value});
            }
            else {
                console.log("exists");
                return callbackFunction({code: "USER_DOES_NOT_EXIST", roomCode, username, response});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function addTrack(rooms, roomCode, username, callbackFunction) {
    const trackData = {
        name: "test track",
        thumbnail: "img.jpg",
        addedBy: "Johnny",
    }
    rooms.findOneAndUpdate(
        {_id: roomCode}, 
        {
            $push: {queue: {trackData, votes: 0, position: 0, timestamp: Date.now(), trackId: new ObjectId()}},
            $inc: {userCount: 1, queueLength: 1},
        },
        {
            writeConcern: {w:1}, 
            returnOriginal: false
        })
        .then(response => {
            if (response.lastErrorObject.updatedExisting) {
                console.log("added track");
                io.to(roomCode).emit("message", {roomData: response.value, action: "ADDED_TRACK"});
                return callbackFunction({code: "ADDED_TRACK", roomCode, username, roomData: response.value});
            }
            else {
                console.log("failed to add track");
                return callbackFunction({code: "FAILED_TO_ADD_TRACK", roomCode, username, response});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function upvote(rooms, roomCode, username, trackId, io, callbackFunction) {
    trackId = new ObjectId(trackId);
    // if null track id throw error
    console.log("upvote");
    rooms.findOneAndUpdate(
        {_id: roomCode}, 
        {$inc: {"queue.$[track].position": 1}},
        {
            arrayFilters: [{"track.trackId": trackId}],
            writeConcern: {w:1},
            returnOriginal: false
        })
        .then(response => {
            if (response.lastErrorObject.updatedExisting) {
                console.log("upvoted");
                io.to(roomCode).emit("message", {roomData: response.value, action: "UPVOTED"});
                return callbackFunction({code: "UPVOTED", roomCode, username, roomData: response.value});
            }
            else {
                console.log("upvote failed");
                return callbackFunction({code: "UPVOTE_FAILED", roomCode, username, response});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function downvote(rooms, roomCode, username, trackId, io, callbackFunction) {
    trackId = new ObjectId(trackId);

    rooms.findOneAndUpdate(
        {_id: roomCode}, 
        {$inc: {"queue.$[track].position": -1}},
        {
            arrayFilters: [{"track.trackId": trackId}],
            writeConcern: {w:1},
            returnOriginal: false
        })
        .then(response => {
            if (response.lastErrorObject.updatedExisting) {
                console.log("downvoted");
                io.to(roomCode).emit("message", {roomData: response.value, action: "DOWNVOTED"});
                return callbackFunction({code: "DOWNVOTED", roomCode, username, roomData: response.value});
            }
            else {
                console.log("downvote failed");
                return callbackFunction({code: "FAILED_TO_DOWNVOTE", roomCode, username, response});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function handleRegister() {
    console.log("a user registered")
}

http.listen(8080, function () {
    console.log('listening on *:8080');
});
