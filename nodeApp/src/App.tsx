import React from "react";
import Navigation from "./components/Navigation/navigation";

import Home from "./components/Home/home";

import "./style/app.less";

import ISocketHandler from "./api/websocket/ISocketHandler";
import { SocketHandler } from "./api/websocket/socketHandler";

class App extends React.Component {

    public socket: ISocketHandler = new SocketHandler();

    public render() {
        return (
            <div className="app">
                <Navigation/>
                <Home socket={this.socket} />
            </div>
        );
    }
}

export default App;
