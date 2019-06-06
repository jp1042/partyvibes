import React, { useState } from "react";

import { UserType } from "../../data/user/userType";

import { IUser } from "../../data/user/IUser";
import CreateRoomComponent from "./createRoom";
import JoinRoomComponent from "./joinRoom";

import { SocketHandler } from "../../api/websocket/socketHandler";

import ISocketHandler from "../../api/websocket/ISocketHandler";

function Home(props) {
    const [userType, setUserType] = useState(UserType.Unset);

    const user: IUser = JSON.parse(sessionStorage.getItem("user")) || {
        name: "",
        roomCode: "",
        ip: "",
        userType
    };

    sessionStorage.setItem("user", JSON.stringify(user));

    if (userType === UserType.Unset) {
        return MainMenu();
    }
    if (userType === UserType.Guest) {
        return (<JoinRoomComponent socket={props.socket}/>);
    }
    if (userType === UserType.Host) {
        return (<CreateRoomComponent socket={props.socket}/>);
    }

    function MainMenu() {
        return (
            <div className="main-menu">
                <p> {userType} </p>
                <button onClick={() => setUserType(UserType.Guest)}>JOIN ROOM</button>
                <button onClick={() => setUserType(UserType.Host)}>CREATE ROOM</button>
            </div>
        );
    }
}

export default Home;
