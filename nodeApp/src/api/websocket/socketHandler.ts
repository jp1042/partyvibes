import io from "socket.io-client";

export class SocketHandler {
    public socket = io.connect("http://localhost:8080");

    public SocketHandler() {
        this.socket.on("error", (err) => {
            console.log("received socket error:");
            console.log(err);
        });
    }

    public registerHandler(setRoomData) {
        // this.socket.on("message", (msg) => {
        //     console.log(msg);
        // });

        this.socket.on('roomUpdate', function (msg) {
            console.log(msg);
            localStorage.setItem("roomData", JSON.stringify(msg));
            setRoomData(msg);
        });
    }

    public unregisterHandler() {
        this.socket.off("message");
    }

    public register(name, cb) {
        this.socket.emit("register", name, cb);
    }

    public callBackTest(data) {
        return(data);
    }

    public JoinRoom(roomCode, username, cb) {
        this.socket.emit("joinRoom", roomCode, username, cb);
    }

    public RejoinRoom(roomCode, username, cb) {
        this.socket.emit("rejoinRoom", roomCode, username, cb);
    }

    public leave(roomCode, cb) {
        this.socket.emit("leave", roomCode, cb);
    }

    public Message(message, roomCode, username) {
        this.socket.emit("message", message, roomCode, username);
    }

    public RecieveMessage(setMessages) {
        this.socket.on('broadcastMessage', (message) => {
            console.log("test" + message);
            setMessages(messages => [...messages, message]);
        });
    }

    public getChatrooms(cb) {
        this.socket.emit("chatrooms", null, cb);
    }

    public getAvailableUsers(cb) {
        this.socket.emit("availableUsers", null, cb);
    }

    public CreateRoom(roomCode, cb) {
        this.socket.emit("createRoom", roomCode, cb);
    }

    public Upvote(roomCode, username, trackId, cb) {
        this.socket.emit("upvote", roomCode, username, trackId, cb);
    }

    public Downvote(roomCode, username, trackId, cb) {
        this.socket.emit("downvote", roomCode, username, trackId, cb);
    }

    public AddTrack(roomCode, username, trackData, cb) {
        this.socket.emit("addTrack", roomCode, username, trackData, cb);
    }
}
