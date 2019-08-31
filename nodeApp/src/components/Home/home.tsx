import React, { useState, useEffect } from "react";

import { UserType } from "../../data/user/userType";

import { IUser } from "../../data/user/IUser";
import Room from "../Room/room";
import CreateRoomComponent from "./createRoom";
import JoinRoomComponent from "./joinRoom";
import TestPage from "./testPage";

function Home(props) {
    const user: IUser = JSON.parse(localStorage.getItem("user")) || {};
    const sessionRoomData = JSON.parse(localStorage.getItem("roomData")) || null;

    const [userType, setUserType] = useState(user.userType || UserType.Unset);
    const [roomCode, setRoomCode] = useState(user.roomCode);
    const [username, setUserName] = useState(user.username);
    const [roomData, setRoomData] = useState(sessionRoomData);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        props.socket.registerHandler(setRoomData);
        props.socket.RecieveMessage(setMessages);
        // if (!!roomCode && !!username) {
        //     props.socket.RejoinRoom(roomCode, username, Rejoined);
        // }
    }, []);

    user.username = username;
    user.roomCode = roomCode;
    user.userType = userType;

    console.log("session set");
    localStorage.setItem("user", JSON.stringify(user));

    //props.socket.registerHandler(setRoomData);

    //return (<TestPage socket={props.socket}/>);

    if (!!roomData) {
        return (<Room data={roomData} messages={messages} socket={props.socket}/>);
    }
    if (userType === UserType.Unset) {
        return MainMenu();
    }
    if (userType === UserType.Guest) {
        return (<JoinRoomComponent socket={props.socket} usernameHook={(data) => setUserName(data)}/>);
    }
    if (userType === UserType.Host) {
        return (<CreateRoomComponent socket={props.socket} roomCodeHook={(data) => setRoomCode(data)}/>);
    }

    function Rejoined() {
        console.log("REJOINED");
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
