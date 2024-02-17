import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentSong, audioRef, setDuration, progressBarRef }) => {
    let artist = {}
    if (currentSong.currentSong !== '') {
        artist = currentSong.currentSong.artist
    }
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <div>
            <audio
                src={currentSong.currentSong.file_path}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata} />
            <div className="audio-info">
                <div className="audio-image">
                    {/* CONDITIONALLY RENDER SONG IMAGE OR MUSIC NOTE */}
                    {/* {currentSong.thumbnail ? (
                        <img src={currentSong.thumbnail} alt="audio avatar" />
                    ) : ( */}
                    <div className="icon-wrapper">
                        <span className="audio-icon">
                            <BsMusicNoteBeamed />
                        </span>
                    </div>
                    {/* )} */}
                </div>
                <div className="song-info">
                    <span className="title">{currentSong.currentSong.title}</span>
                    -
                    <span>by {artist?.username}</span>
                </div>
            </div>
        </div>
    )
};
export default DisplayTrack;
