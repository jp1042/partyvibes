import React from "react";
import Track from "../Track/track";

import FlipMove from "react-flip-move";
import Search from "../Search/search";

export default class Queue extends React.Component<any> {
    public render() {

        const sortedQueue = this.props.data.sort((currentTrack, nextTrack) => {
            return nextTrack.position - currentTrack.position;
        });

        return (
            <div>
                <Search socket={this.props.socket}/>
                <div className="queue">
                    <FlipMove>
                        {sortedQueue.map((track, index) =>
                            <Track key={track.trackId} data={track} queuePosition={index + 1} socket={this.props.socket} />
                        )}
                    </FlipMove>
                </div>
            </div>
        );
    }
}
