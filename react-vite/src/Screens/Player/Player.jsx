import { useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlayerContext } from "../../context/PlayerContext";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./Player.css"

const Player = () => {
    const { currentSong, setCurrentSong } = useContext(PlayerContext);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();
    return (
        <span className="player-box">
            <h2>Player</h2>
            <div className="inner">
                <DisplayTrack
                    currentSong={{ currentSong }}
                    audioRef={audioRef}
                    setDuration={setDuration}
                    progressBarRef={progressBarRef}
                />
                <Controls
                    audioRef={audioRef}
                    progressBarRef={progressBarRef}
                    duration={duration}
                    setTimeProgress={setTimeProgress} />
                <ProgressBar
                    progressBarRef={progressBarRef}
                    audioRef={audioRef}
                    timeProgress={timeProgress}
                    duration={duration} />
            </div>
        </span>
    )
};

export default Player
