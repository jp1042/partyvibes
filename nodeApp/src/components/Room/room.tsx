import React from "react";

import {IUser} from "../../data/user/IUser";
import Queue from "../Queue/queue";
import Navigation from "../Navigation/navigation";

export default class Room extends React.Component<any> {
    public render() {
        //console.log(this.props.data);
        return (
        <div className="room">
            <div className="header">
                <div className="title">partyvib.es</div>
                <div className="room-code">
                    <i className="material-icons">home</i>
                    <div className="room-code-value">
                        {this.props.data.roomData._id}
                    </div>
                </div>
            </div>
            <Queue data={this.props.data.roomData.queue} socket={this.props.socket}/>
            <Navigation userCount={this.props.data.roomData.userCount}/>
        </div>
        );
    }
}
