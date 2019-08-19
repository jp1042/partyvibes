import React from "react";

const Navigation = (props) => {
    return (
        <nav id="Navigation" className="navigation">
            <div className="swapper">
                <i className="material-icons">chat_bubble_outline</i>
                <i className="material-icons">equalizer</i>
                <i className="material-icons">whatshot</i>
            </div>

            <div className="user-count">
                <i className="material-icons">people</i>
                <div className="digits">
                    {props.userCount}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
