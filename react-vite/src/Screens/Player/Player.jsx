import { useState, useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./Player.css"

const Player = () => {
    const { currentSong, setCurrentSong, timeProgress, setTimeProgress, setIsPlaying, songQueue, songIndex, setSongIndex } = useContext(PlayerContext);
    // const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        setIsPlaying(false)
        setTimeProgress(0);
        setDuration(0);
        if (currentSong !== undefined) setIsPlaying(true);
    }, [currentSong, setIsPlaying, setTimeProgress]);

    return (
        <span className="player-box">

            <div className="inner">
                <h2 className="player-name">Player</h2>
                <DisplayTrack
                    currentSong={{ currentSong }}
                    audioRef={audioRef}
                    setDuration={setDuration}
                    progressBarRef={progressBarRef}
                    songIndex={songIndex}
                    setSongIndex={setSongIndex}
                    songQueue={songQueue}
                    setCurrentSong={setCurrentSong}
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
                    setTimeProgress={setTimeProgress}
                    duration={duration}
                    songIndex={songIndex}
                    setSongIndex={setSongIndex}
                    songQueue={songQueue}
                    setCurrentSong={setCurrentSong} />
            </div>
        </span>
    )
};

export default Player
