import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { pauseQueueThunk, playNextThunk } from '../../redux/queue';

const DisplayTrack = ({ currentSong, audioRef, setDuration, progressBarRef, setSongIndex, setCurrentSong, songIndex, songQueue }) => {
    let artist = {}
    const dispatch = useDispatch();
    if (currentSong?.currentSong !== '') {
        artist = currentSong.currentSong?.artist
    }
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    const handleEnded = async () => {
        if (songQueue.length > 1) {
            await dispatch(playNextThunk());
        } else {
            await dispatch(pauseQueueThunk());
        };
    };

    return (
        <div>
            <audio

                src={currentSong?.currentSong?.file_path}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleEnded} />
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
