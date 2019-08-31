import React, { useState, useEffect, useRef } from "react";
import {musicService} from "./musicServiceEnum";
import { css } from "@emotion/core";
import { BarLoader } from "react-spinners";
import { func } from "prop-types";
import FlipMove from "react-flip-move";

function Search(props) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultsOpen, setResultsOpen] = useState(true);
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
        setSearchResults([]);
        if (input) {
            // api call
            const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=25";
            const regionCode = "&regionCode=GB";
            const apiKey = "&key=AIzaSyANrCCmb4ldKcC62FxHky7s_aNkZkHG9TA";
            const query = "&q=" + input;
            setLoading(true);
            fetch(url + regionCode + apiKey + query).then((response) => {
                response.json().then((data) => {
                    setSearchResults(data.items);
                    setResultsOpen(true);
                    setLoading(false);
                });
            });
        }
    }

    function renderSearchResults() {
        if (searchResults) {
            return (
                <div className="search-results">
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
    }
}

export default Search;
