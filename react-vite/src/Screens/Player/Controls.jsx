import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    IoPlaySharp,
    IoPauseSharp,
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp
} from 'react-icons/io5';
import { useContext, useRef, useCallback } from "react";
import { PlayerContext } from "../../context/PlayerContext";



const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress,
    isPlaying, setIsPlaying, currentSong, handleNext, handlePrevious,
    skipForward, skipBackward }) => {
    const playAnimationRef = useRef();
    const dispatch = useDispatch();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );


        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    const togglePlayPause = async () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (isPlaying === true) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat)
    }, [isPlaying, audioRef, repeat])

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={skipBackward}>
                    <IoPlayBackSharp />
                </button>

                <button
                    onClick={togglePlayPause}
                    disabled={currentSong === undefined ? true : false}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                <button onClick={skipForward}>
                    <IoPlayForwardSharp />
                </button>
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
        </div>
    )
};
export default Controls;
