import React from "react";

export default class TestPage extends React.Component<any> {
    public render() {
        return (
            <div className="test-page">
                <div> Create Room</div>
                <div> Max 12 Characters</div>
                <input type="text" id="CreateRoomCodeInputField"/>
                <button onClick={this.CreateRoom}>CREATE</button>
                <br/>
                <br/>
                Join Room
                <div> Enter room code</div>
                <input id="JoinRoomCodeInputField"/>
                <div> Enter name</div>
                <div> Max  12 characters</div>
                <input id="NameInputField"/>
                <button onClick={this.JoinRoom}>JOIN</button>
                <br/>
                <br/>
                <button onClick={this.Upvote}>Upvote</button>
                <button onClick={this.Downvote}>Downvote</button>
            </div>
        );
    }

    private JoinRoom = (event) => {
        event.preventDefault();
        const roomCodeInput = (document.getElementById("JoinRoomCodeInputField") as HTMLInputElement).value;
        const nameInput = (document.getElementById("NameInputField") as HTMLInputElement).value;
        this.props.socket.JoinRoom(roomCodeInput, nameInput, this.Callback);
    }

    private CreateRoom = (event) => {
        event.preventDefault();

        // todo: sanitise inputs
        const input = (document.getElementById("CreateRoomCodeInputField") as HTMLInputElement).value;
        this.props.socket.CreateRoom(input, this.Callback);
    }

    private Upvote = (event) => {
        event.preventDefault();
        const roomCode = "test";
        const username = "johnny";
        const trackId = "5d0aae6f7e55470b1805c5da";

        this.props.socket.Upvote(roomCode, username, trackId, this.Callback);
    }

    private Downvote = (event) => {
        event.preventDefault();
        const roomCode = "test";
        const username = "johnny";
        const trackId = "5d0aae6f7e55470b1805c5da";

        this.props.socket.Downvote(roomCode, username, trackId, this.Callback);
    }

    private Callback = (result) => {
        console.log(result);
    }
}
