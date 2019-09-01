import React from "react";
import Vote from "../Vote/vote";

export default class Track extends React.Component<any> {
    public render() {
        return (
            <div className="track">
                <div className="queue-position">{this.props.queuePosition}</div>
                <div className="thumbnail-image-wrapper">
                    <img className="thumbnail" src={this.props.data.trackData.thumbnail} />
                </div>
                <div className="details">
                    <div className="name">{this.props.data.trackData.name}</div>
                    <div className="added-by">{this.props.data.trackData.addedBy}</div>
                </div>
                <Vote
                    trackId={this.props.data.trackId}
                    position={this.props.data.position}
                    socket={this.props.socket}
                />
            </div>
        );
    }
}
