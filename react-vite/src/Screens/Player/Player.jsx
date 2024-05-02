import { useState, useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./Player.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteFromQueueThunk } from "../../redux/queue";

const Player = () => {
    const dispatch = useDispatch();
    const { currentSong, setCurrentSong, timeProgress, setTimeProgress, isPlaying, setIsPlaying, songIndex, setSongIndex } = useContext(PlayerContext);
    // const [currentSong, setCurrentSong] = useState(undefined);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [songIndex, setSongIndex] = useState(0);
    // const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const songQueue = useSelector(state => state.queue.songs);
    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        // setTimeProgress(0);
        // setDuration(0);
        setCurrentSong(songQueue[songIndex]);
    }, [songQueue, songIndex, setCurrentSong, currentSong]);

    // useEffect(() => {
    //     setIsPlaying(queuePlaying);
    // }, [queuePlaying])

    const handleNext = async () => {
        if (songQueue.length <= 1) {
            await dispatch(deleteFromQueueThunk(currentSong.id));
            setCurrentSong(null);
            setDuration(0);
            progressBarRef.current.value = 0;
            setIsPlaying(false);
            console.log("?????", currentSong);
        } else {
            if (songIndex >= songQueue.length - 1) {
                setSongIndex(0);
                setCurrentSong(songQueue[0]);
            } else {
                setSongIndex((prev) => prev + 1);
                setCurrentSong(songQueue[songIndex + 1]);
            }
        }
    };

    const handlePrevious = () => {
        if (songIndex === 0) {
            setSongIndex(songQueue.length - 1);
            setCurrentSong(songQueue[songQueue.length - 1]);
        } else {
            setSongIndex((prev) => prev - 1);
            setCurrentSong(songQueue[songIndex - 1]);
        }
    };

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    return (
        <span className="player-box">
            <div className="inner">
                {currentSong &&
                    <>
                        <DisplayTrack
                            currentSong={{ currentSong }}
                            audioRef={audioRef}
                            setDuration={setDuration}
                            progressBarRef={progressBarRef}
                            songIndex={songIndex}
                            setSongIndex={setSongIndex}
                            setCurrentSong={setCurrentSong}
                            songQueue={songQueue}
                            handleNext={handleNext}
                        />
                        <Controls
                            audioRef={audioRef}
                            progressBarRef={progressBarRef}
                            duration={duration}
                            setTimeProgress={setTimeProgress}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            currentSong={currentSong}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            skipBackward={skipBackward}
                            skipForward={skipForward} />
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
                    </>
                }
            </div>
        </span>
    )
};

export default Player
