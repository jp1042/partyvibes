import React from "react";

import SpotifyPlayer from "./spotifyPlayer";

// tslint:disable-next-line:no-var-requires
import hash from "hash";

import $ from "jquery";
import { debug } from "util";

export default class SpotifyAuthentication extends React.Component {

    public authEndpoint = "https://accounts.spotify.com/authorize?";

    public clientId = "c2d8121de8dd4815916a5f7ad307bfc5";
    public redirectUri = "http://localhost:8080/";
    public scopes = [
        "user-read-currently-playing",
        "user-read-playback-state",
        "user-modify-playback-state",
    ];

    public state = {
        token: sessionStorage.getItem("spotifyAuthToken") ||  "",
    };

    public hash;

    public componentDidMount() {
        // Set token
        // tslint:disable-next-line:no-debugger
        this.hash = window.location.hash
            .substring(1)
            .split("&")
            .reduce((initial, item) => {
                if (item) {
                    const parts = item.split("=");
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});

        const token = this.hash.access_token;
        if (token) {
            // Set token
            this.setState({
                token
            });
            console.log(token);
            window.location.hash = "";
            sessionStorage.setItem("spotifyAuthToken", token);
        }
    }

    public render() {
        return (
            <div id="spotifyPlayer" className="spotify-player">
                {/* <iframe
                src="https://open.spotify.com/embed/user/nhojrekrap/playlist/1m64eDEIOsTb2vvhf9DdSe"
                width="300"
                height="380"
                frameBorder="0"
                allowTransparency={true}
                allow="encrypted-media"
            /> */}
                {
                    !this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            id="login-cta"
                            href={`${this.authEndpoint}client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes.join("%20")}&response_type=token&show_dialog=true`}
                        >
                            spotify
                        </a>
                    )}
                {
                    this.state.token && (
                        <div>
                            <iframe
                                src="https://open.spotify.com/embed/user/nhojrekrap/playlist/1m64eDEIOsTb2vvhf9DdSe"
                                width="300"
                                height="380"
                                frameBorder="0"
                                allowTransparency={true}
                                allow="encrypted-media"
                            />
                            {/* <SpotifyPlayer /> */}
                        </div>
                    )
                }
            </div>
        );
    }
}
