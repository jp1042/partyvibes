import React from "react";
import { IUser } from "../../data/user/IUser";

export default class Vote extends React.Component<any> {
    public render() {
        return (
        <div className="vote">
            <i className="material-icons" onClick={this.Upvote}>keyboard_arrow_up</i>
            <div className="number-of-votes">{this.props.position}</div>
            <i className="material-icons" onClick={this.Downvote}>keyboard_arrow_down</i>
        </div>
        );
    }

    private Upvote = (event) => {
        event.preventDefault();
        const username = JSON.parse(localStorage.getItem("username"));
        const roomcode = JSON.parse(localStorage.getItem("roomcode"));
        //console.log(roomcode);
        //console.log(username);
        //console.log(this.props.trackId);
        this.props.socket.Upvote(roomcode, username, this.props.trackId, this.Callback);
    }

    private Downvote = (event) => {
        const username = JSON.parse(localStorage.getItem("username"));
        const roomcode = JSON.parse(localStorage.getItem("roomcode"));
        event.preventDefault();
        this.props.socket.Downvote(roomcode, username, this.props.trackId, this.Callback);
    }

    private Callback = (msg) => {
        console.log(msg);
    }
}
