import React, { useState, useEffect, useRef } from "react";
import {musicService} from "./musicServiceEnum";
import { BarLoader } from "react-spinners";
import FlipMove from "react-flip-move";

function Search(props) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState(musicService.youtube);
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className="search">
            <div className="search-field">
                <input
                    type="text"
                    id="SearchInput"
                    onKeyUp={(e) => handleChange(e)}
                    className={"search-input " + getServiceName(service)}
                    placeholder={"searching " + getServiceName(service)}
                />
                {renderYoutubeSVG()}
                <i onClick={(e) => search(e)} className="material-icons">search</i>
                {renderClose()}
                <div className="loading">
                    <BarLoader
                        widthUnit="100%"
                        color={"#F44336"}
                        loading={loading}
                    />
                </div>
            </div>
            {renderSearchResults()}
        </div>
    );

    function renderClose() {
        if (searchResults.length) {
            return (
                <i onClick={() => setSearchResults([])} className="material-icons">close</i>
            );
        }
    }

    function getServiceName(value) {
        if (value === musicService.youtube) {
            return "youtube";
        }
        if (value === musicService.spotify) {
            return "spotify";
        }
    }

    function handleChange(e) {
        setInput(e.target.value);
        if (e.key === "Enter") {
            search(e);
        }
    }

    function search(e) {
        e.preventDefault();
        //setSearchResults([]);
        if (input) {
            // api call
            const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=25";
            const regionCode = "&regionCode=GB";
            // const apiKey = "&key=AIzaSyANrCCmb4ldKcC62FxHky7s_aNkZkHG9TA"; new
            const apiKey = "&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE"; // old
            const query = "&q=" + input;
            setLoading(true);
            fetch(url + regionCode + apiKey + query).then((response) => {
                response.json().then((data) => {
                    setSearchResults(data.items);
                    setLoading(false);
                });
            });
        }
    }

    function getSearchResultsStyle() {
        if (searchResults.length) {
            console.log("not emprty");
            return {
                background: "white"
            };
        }
    }

    function renderYoutubeSVG() {
        return (
            <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                className="youtube-svg"
            >
                <g>
                    <path fillRule="nonzero" d="M21.78 8s-.2-1.37-.8-1.97c-.75-.8-1.6-.8-2-.85C16.2 4.98 12 5 12 5s-4.18-.02-6.97.18c-.4.05-1.24.05-2 .85-.6.6-.8 1.97-.8 1.97s-.2 1.63-.23 3.23v1.7c.03 1.6.23 3.2.23 3.2s.2 1.4.8 2c.76.8 1.75.76 2.2.85 1.57.15 6.6.18 6.77.18 0 0 4.2 0 7-.2.38-.04 1.23-.04 2-.84.6-.6.8-1.98.8-1.98s.2-1.6.2-3.22v-1.7c-.02-1.6-.22-3.22-.22-3.22zm-11.8 7V9.16l5.35 3.03L9.97 15z"/>
                </g>
            </svg>
        );
    }

    function renderSearchResults() {
        if (searchResults) {
            return (
                <div className="search-results" style={getSearchResultsStyle()}>
                    <FlipMove>
                        {searchResults.map((item) => (
                            <div key={item.id.videoId} className="item">
                                <div className="thumbnail-image-wrapper">
                                    <img className="thumbnail" src={item.snippet.thumbnails.high.url}/>
                                </div>
                                <div className="title">{item.snippet.title}</div>
                                <i className="material-icons" onClick={(e) => addTrack(e, item)}>add_circle</i>
                            </div>
                        ))}
                    </FlipMove>
                </div>
            );
        }
    }

    function addTrack(e, track) {
        e.preventDefault();
        const filteredResults = searchResults.filter((item) => item.id.videoId !== track.id.videoId);
        setSearchResults(filteredResults);
        const username = JSON.parse(localStorage.getItem("username"));
        const roomcode = JSON.parse(localStorage.getItem("roomcode"));
        props.socket.AddTrack(
            roomcode,
            username,
            {
                name: track.snippet.title,
                thumbnail: track.snippet.thumbnails.high.url,
                addedBy: username
            },
            addTrackCallback);
    }

    function addTrackCallback(data) {
        console.log(data);
    }
}

export default Search;
