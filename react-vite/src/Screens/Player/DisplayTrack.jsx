import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentSong, audioRef, setDuration, progressBarRef, setSongIndex, setCurrentSong, songIndex, songQueue }) => {
    let artist = {}
    if (currentSong?.currentSong !== '') {
        artist = currentSong.currentSong?.artist
    }
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    const testFunc = () => {
        if (songIndex < songQueue.length - 1) {
            setSongIndex(songIndex + 1);
            console.log(songIndex);
            setCurrentSong(songQueue[songIndex]);
        } else {
            console.log("wtf", songQueue.length);
            setCurrentSong(songQueue[0]);
        }
        progressBarRef.current.value = 0;
        audioRef.current.currentTime = 0;
    };

    return (
        <div>
            <audio

                src={currentSong?.currentSong?.file_path}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={testFunc} />
            <div className="audio-info">
                <div className="audio-image">
                    {/* CONDITIONALLY RENDER SONG IMAGE OR MUSIC NOTE */}
                    {currentSong.song_image ? (
                        <img src={currentSong.song_image} alt="audio avatar" />
                    ) : (
                        <div className="icon-wrapper">
                            <span className="audio-icon">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
                <div className="song-info">
                    <span className="title">{currentSong?.currentSong?.title}</span>
                    -
                    <span>by {artist?.username}</span>
                </div>
            </div>
        </div>
    )
};
export default DisplayTrack;
