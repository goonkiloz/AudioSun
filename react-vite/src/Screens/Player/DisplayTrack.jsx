import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentSong, audioRef }) => {
    return (
        <div>
            <audio src={currentSong.file_path} ref={audioRef} />
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
                <div className="text">
                    <p className="title">{currentSong.title}</p>
                    <p>{currentSong.artist}</p>
                </div>
            </div>
        </div>
    )
};
export default DisplayTrack;
