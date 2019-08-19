export default interface ISocketHandler {

    registerHandler(onMessageReceived);

    unregisterHandler();

    register(name, cb);

    callBackTest(data);

    JoinRoom(roomCode, username, cb);

    RejoinRoom(roomCode, username, cb);

    leave(roomCode, cb);

    message(roomCode, msg, cb);

    getChatrooms(cb);

    getAvailableUsers(cb);

    CreateRoom(roomCode, cb);
}
