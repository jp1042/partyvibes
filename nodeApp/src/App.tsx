import React from "react";
import Navigation from "./components/Navigation/navigation";

import Home from "./components/Home/home";

import "./style/app.less";

import ISocketHandler from "./api/websocket/ISocketHandler";
import { SocketHandler } from "./api/websocket/socketHandler";

class App extends React.Component {

    public socket: ISocketHandler = new SocketHandler();
    public roomcode = JSON.parse(localStorage.getItem("roomcode")) || null;
    public username = JSON.parse(localStorage.getItem("username")) || null;


    public render() {

        if (!!this.roomcode && !!this.username) {
            this.socket.RejoinRoom(this.roomcode, this.username, this.Rejoined);
        }
        return (
            <div className="app">
                <Home socket={this.socket} />
            </div>
        );
    }

    public Rejoined = () => {
        console.log("REJOINED");
    }
}

export default App;
