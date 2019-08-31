import React from "react";

const Navigation = (props) => {

    return (
        <nav id="Navigation" className="navigation">
            <div className="swapper">
                <i onClick={(e) => GoToSlide(e, 0)} style={IsActiveStyle(0)} className="material-icons">equalizer</i>
                <i onClick={(e) => GoToSlide(e, 1)} style={IsActiveStyle(1)} className="material-icons">chat_bubble_outline</i>
                <i onClick={(e) => GoToSlide(e, 2)} style={IsActiveStyle(2)} className="material-icons">whatshot</i>
            </div>

            <div className="user-count">
                <i className="material-icons">people</i>
                <div className="digits">
                    {props.userCount}
                </div>
            </div>
        </nav>
    );

    function IsActiveStyle(option) {
        if (option === props.activeSlide) {
            return {
                color: "#F44336"
            };
        }
    }

    function GoToSlide(e, slideNumber) {
        e.preventDefault();
        props.slider.slickGoTo(slideNumber);
    }
};

export default Navigation;
