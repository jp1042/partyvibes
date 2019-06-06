import React from "react";

export default class JoinRoomComponent extends React.Component<any> {
    public render() {
        return (
            <div className="join-room">
                <div> Enter room code</div>
                <input id="RoomCodeInputField"/>
                <div> Enter name</div>
                <div> Max  12 characters</div>
                <input id="NameInputField"/>
                <button onClick={this.JoinRoom}>JOIN</button>
            </div>
        );
    }

    private JoinRoom = (event) => {
        event.preventDefault();
        const roomCodeInput = (document.getElementById("RoomCodeInputField") as HTMLInputElement).value;
        const nameInput = (document.getElementById("NameInputField") as HTMLInputElement).value;
        this.props.socket.JoinRoom(roomCodeInput, nameInput, this.props.socket.callBackTest);
    }
}
