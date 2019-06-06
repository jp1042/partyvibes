const MongoClient = require('mongodb').MongoClient;

class MongoConnection {
    static connectToMongo() {
        if (this.db) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(db => this.db = db)
    }
}

MongoConnection.uri = "mongodb+srv://nhojrekrap:<CLownfish23!>@partyvibes-r4e8r.mongodb.net/PartyBase";
MongoConnection.db = null;
MongoConnection.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true
}

module.exports = {
    MongoConnection,
    // createRoom: function (roomCode) {
    //     console.log("create");
    //     var rooms = MongoConnection.db.collection("Rooms");
    //     var room = rooms.find({ roomCode: roomCode });

    //     if (!!room) {
    //         return false
    //     }
    //     else {
    //         rooms.insert({ roomCode: roomCode, users: 1 })
    //     }
    // }
};

