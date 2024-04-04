const ProgressBar = ({ progressBarRef, audioRef, timeProgress, setTimeProgress, duration, songIndex, setSongIndex, songQueue, setCurrentSong }) => {

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    // if (audioRef?.current?.currentTime >= Math.round(audioRef?.current?.duration)) {
    //     if (songIndex < songQueue.length - 1) {
    //         setSongIndex(songIndex + 1);
    //         console.log(songIndex);
    //         setCurrentSong(songQueue[songIndex]);
    //     } else {
    //         console.log("wtf", songQueue.length);
    //         setCurrentSong(songQueue[0]);
    //     }
    //     progressBarRef.current.value = 0;
    //     audioRef.current.currentTime = 0;
    // }

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
        </div>
    );
};

export default ProgressBar;
