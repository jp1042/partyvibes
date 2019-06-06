import io from "socket.io-client";

export class SocketHandler {
    public socket = io.connect("http://localhost:8080");

    public SocketHandler() {
        this.socket.on("error", (err) => {
            console.log("received socket error:");
            console.log(err);
        });
    }

    public registerHandler(onMessageReceived) {
        this.socket.on("message", onMessageReceived);
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

    public leave(roomCode, cb) {
        this.socket.emit("leave", roomCode, cb);
    }

    public message(roomCode, msg, cb) {
        this.socket.emit("message", { roomCode, message: msg }, cb);
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
}
