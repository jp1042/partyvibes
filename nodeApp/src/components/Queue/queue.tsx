import React from "react";
import Track from "../Track/track";

export default class Queue extends React.Component<any> {
    public render() {

        const sortedQueue = this.props.data.sort((currentTrack, nextTrack) => {
            return nextTrack.position - currentTrack.position;
        });

        return (
        <div className="queue">
           {
               sortedQueue.map((track, index) =>
                <Track key={index} data={track} socket={this.props.socket}/>
               )
           }
        </div>
        );
    }
}
