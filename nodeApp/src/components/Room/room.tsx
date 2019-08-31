import React, { useState, useRef, useEffect } from "react";

import { IUser } from "../../data/user/IUser";
import Queue from "../Queue/queue";
import Navigation from "../Navigation/navigation";
import Slider from "react-slick";
import Chat from "../Chat/chat";

function Room(props) {
    //const slider = useRef(null);
    //const [sliderRef, setSliderRef] = useState(null);

    const [slider, setSlider] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current) => setActiveSlide(current)
    };

    useEffect(
        () => {
            if (activeSlide === 1) {
                document.getElementById("ChatInput").focus();
            }
            if (activeSlide === 0) {
                document.getElementById("SearchInput").focus();
            }
        }, [activeSlide]
    );

    //console.log(this.props.data);
    return (
        <div className="room">
            <div className="header">
                <div className="title">partyvib.es</div>
                <div className="room-code">
                    <i className="material-icons">home</i>
                    <div className="room-code-value">
                        {props.data.roomData._id}
                    </div>
                </div>
            </div>
            <Slider className="slider" ref={x => (setSlider(x))} {...settings}>
                <Queue data={props.data.roomData.queue} socket={props.socket} />
                <Chat messages={props.messages} socket={props.socket}/>
                <div>
                    Hot
                </div>
            </Slider>
            {/* <Navigation slider={slider} userCount={props.data.roomData.userCount} /> */}
            {renderNavigation()}
        </div>
    );

    function renderNavigation() {
        if (!!slider) {
            return (
                <Navigation activeSlide={activeSlide} slider={slider} userCount={props.data.roomData.userCount} />
            );
        }
    }
}

export default Room;
