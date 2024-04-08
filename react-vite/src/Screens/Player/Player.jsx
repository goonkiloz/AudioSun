import { useState, useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./Player.css"
import { useSelector } from "react-redux";

const Player = () => {
    // const { currentSong, setCurrentSong, timeProgress, setTimeProgress, isPlaying, setIsPlaying, songIndex, setSongIndex } = useContext(PlayerContext);
    const [currentSong, setCurrentSong] = useState(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songIndex, setSongIndex] = useState(0);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const songQueue = useSelector(state => state.queue.songs);
    const queuePlaying = useSelector(state => state.queue.playing);
    const queueCurrentSong = useSelector(state => state.queue.currentSong);
    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        setTimeProgress(0);
        setDuration(0);
        setCurrentSong(queueCurrentSong);
    }, [songQueue, songIndex]);

    useEffect(() => {
        setIsPlaying(queuePlaying);
    }, [queuePlaying])

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
                    setCurrentSong={setCurrentSong}
                    songQueue={songQueue}
                />
                <Controls
                    audioRef={audioRef}
                    progressBarRef={progressBarRef}
                    duration={duration}
                    setTimeProgress={setTimeProgress}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong} />
                <ProgressBar
                    progressBarRef={progressBarRef}
                    audioRef={audioRef}
                    timeProgress={timeProgress}
                    setTimeProgress={setTimeProgress}
                    duration={duration}
                    songIndex={songIndex}
                    setSongIndex={setSongIndex}
                    setCurrentSong={setCurrentSong}
                    songQueue={songQueue} />
            </div>
        </span>
    )
};

export default Player
