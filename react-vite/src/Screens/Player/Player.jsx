import { useState } from "react";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { tracks } from "../../data/tracks";
import "./Player.css"

const Player = () => {
    const [currentTrack, setCurrentTrack] = useState(tracks[0]);
    return (
        <span className="player-box">
            <h2>Player</h2>
            <div className="inner">
                <DisplayTrack currentTrack={currentTrack} />
                <Controls />
                <ProgressBar />
            </div>
        </span>
    )
};

export default Player
