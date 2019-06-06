var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;

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
        const users = client.db("PartyBase").collection("Users");        

        socket.on('createRoom', function(roomCode, callbackFunction){
            createRoom(rooms, roomCode, callbackFunction);
            console.log(io.clients.length);
        });

        socket.on('joinRoom', function(roomCode, username, callbackFunction){
            joinRoom(rooms, roomCode, users, username, callbackFunction);
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


function createRoom(rooms, roomCode, callbackFunction) {
    console.log("roomcode: " + roomCode);
    rooms.findOne({roomCode})
    .then(room => {
        if (!!room && !!room.roomCode && !!roomCode) {
            console.log("exists");
            return callbackFunction({response: "ROOM_EXISTS"});
        }
        else {
            console.log("added: " + roomCode);
            rooms.insertOne({ roomCode, users: 0 })
                .then(callbackFunction({response: "SUCCESS", roomCode}))
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function joinRoom(rooms, roomCode, users, username, callbackFunction) {
    console.log("roomcode: " + roomCode);
    rooms.findOne({roomCode})
    .then(room => {
        if (!!room && !!room.roomCode && !!roomCode) {
            users.findOne({roomCode})
            .then(
                users.findOne({roomCode, username})
                .then(user => {
                    if (!user) {
                        rooms.updateOne({roomCode}, { $set: {users: room.users + 1}})
                        .then(users.insertOne({username, roomCode}))
                            .then(callbackFunction({response: "SUCCESS", roomCode, username, }))
                    }
                    else {
                        callbackFunction({response: "USER_EXISTS"});
                    }
                })
            )
        }           
        else {
            return callbackFunction({response: "ROOM_DOES_NOT_EXIST"});
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function handleRegister() {
    console.log("a user registered")
}

http.listen(8080, function () {
    console.log('listening on *:8080');
});
