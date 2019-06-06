import React from "react";

import {IUser} from "../../data/user/IUser";

export default class CreateRoomComponent extends React.Component<any> {
    public render() {
        return (
        <div className="create-room">
            <div> Create Room</div>
            <div> Max 12 Characters</div>
            <input type="text" id="RoomCodeInputField"/>
            <button onClick={this.CreateRoom}>CREATE</button>
        </div>
        );
    }

    private CreateRoom = (event) => {
        event.preventDefault();
        const input = (document.getElementById("RoomCodeInputField") as HTMLInputElement).value;
        this.props.socket.CreateRoom(input, this.CreateRoomResponse);
    }

    private CreateRoomResponse = (data) => {
        switch (data.response) {
            case "SUCCESS":
                const user: IUser = JSON.parse(sessionStorage.getItem("user"));
                user.name = data.username;
                user.roomCode = data.roomCode;
                sessionStorage.setItem("user", JSON.stringify(user));
                break;
            default:
                alert(data.response);
                break;
        }
    }
}
