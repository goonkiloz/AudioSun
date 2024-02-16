import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerContext } from "../../context/PlayerContext";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./Player.css"

const Player = () => {
    const { currentSong, setCurrentSong } = useContext(PlayerContext);
    console.log("song: ", currentSong);

    return (
        <span className="player-box">
            <h2>Player</h2>
            <div className="inner">
                <DisplayTrack currentTrack={currentSong} />
                <Controls />
                <ProgressBar />
            </div>
        </span>
    )
};

export default Player
