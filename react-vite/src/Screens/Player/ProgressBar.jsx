import { useEffect, useState } from "react";
import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
} from 'react-icons/io';

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, setTimeProgress, duration, songIndex, setSongIndex, songQueue, setCurrentSong }) => {

    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return `00:00`;
    }

    //Volume
    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <div className="progress">
            <span className="time current">{formatTime(timeProgress)}</span>
            <input
                type="range"
                ref={progressBarRef}
                defaultValue={"0"}
                onChange={handleProgressChange}
            />
            <span className="time">{formatTime(duration)}</span>
            <div className="volume controls">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                        <IoMdVolumeOff />
                    ) : volume < 40 ? (
                        <IoMdVolumeLow />
                    ) : (
                        <IoMdVolumeHigh />
                    )}
                </button>
                <div className="volume-slider" id="volume-slider">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        style={{
                            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
