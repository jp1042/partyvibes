import React, { useState, useEffect, useRef } from "react";
import FlipMove from "react-flip-move";
import {Emoji, Emojione} from "react-emoji-render";

function Chat(props) {
    const [input, setInput] = useState("");

    let roomcode = localStorage.getItem("roomcode");
    let username = localStorage.getItem("username");

    const messageWindowRef: any = useRef();

    if (roomcode) {
        roomcode = roomcode.replace(/['"]+/g, "");
    }
    if (username) {
        username = username.replace(/['"]+/g, "");
    }

    useEffect(
        () => {
            if (messageWindowRef.current) {
                const messageWindowElement = document.getElementsByClassName("message-window")[0];
                messageWindowElement.scrollTo({
                    behavior: "smooth",
                    top: messageWindowElement.scrollHeight
                });
            }
        },
    );

    return (
        <div className="chat">
            {renderMessages()}
            <div className="message-field">
                <input type="text" id="ChatInput" onKeyUp={(e) => handleChange(e)} className="message-input" />
                <i onClick={(e) => sendMessage(e)} className="material-icons">send</i>
            </div>
        </div>
    );

    function handleChange(e) {
        setInput(e.target.value);
        if (e.key === "Enter") {
            sendMessage(e);
        }
    }

    function sendMessage(e) {
        e.preventDefault();
        if (input) {
            props.socket.Message(input, roomcode, username);
            const inputElement = document.getElementById("ChatInput") as HTMLInputElement;
            inputElement.value = "";
            setInput("");
        }
    }

    function renderMessages() {
        if (props.messages!!) {
            return (
                <FlipMove className="message-window" ref={messageWindowRef}>
                    {
                        props.messages.map((message ) => (
                            <div key={message.id} className="message-wrapper" style={getMessageWrapperStyle(message.username)}>
                                <div className="message" >
                                    <div className="message-text" style={getMessageStyle(message.username)}>
                                        <Emojione onlyEmojiClassName="only-emoji" text={message.text} />
                                    </div>
                                    <div className="message-username">
                                        {message.username}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </FlipMove>
            );
        }
    }

    function getMessageWrapperStyle(messageUsername) {
        if (username !== messageUsername) {
            return {
                justifyContent: "flex-start",
            };
        }
        return null;
    }

    function getMessageStyle(messageUsername) {
        if (username !== messageUsername) {
            return {
                background: "#ff7961",
            };
        }
        return null;
    }
}

export default Chat;
