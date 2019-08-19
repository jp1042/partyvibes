import React from "react";

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

        // todo: sanitise inputs
        const input = (document.getElementById("RoomCodeInputField") as HTMLInputElement).value;
        this.props.socket.CreateRoom(input, this.CreateRoomResponse);
    }

    private CreateRoomResponse = (data) => {
        switch (data.response) {
            case "SUCCESS":
                this.props.roomCodeHook(data.roomCode);
                break;
            default:
                alert(data.response);
                break;
        }
    }
}
