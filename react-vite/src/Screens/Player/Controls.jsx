import { useEffect, useState } from "react";
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';
import { useContext, useRef, useCallback } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
    const { isPlaying, setIsPlaying, currentSong } = useContext(PlayerContext);
    const playAnimationRef = useRef();

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

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev)
    }

    useEffect(() => {
        console.log(currentSong)
    }, [currentSong])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat)
    }, [isPlaying, audioRef, repeat])

    const skipForward = () => { };

    const skipBackward = () => { };

    const handlePrevious = () => { };

    const handleNext = () => { };

    return (
        <div className="controls-wrapper">
            <div className="controls">
                {/* <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={skipBackward}>
                    <IoPlayBackSharp />
                </button> */}

                <button
                    onClick={togglePlayPause}
                    disabled={currentSong === '' ? true : false}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                {/* <button onClick={skipForward}>
                    <IoPlayForwardSharp />
                </button>
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button> */}
            </div>
        </div>
    )
};
export default Controls;
