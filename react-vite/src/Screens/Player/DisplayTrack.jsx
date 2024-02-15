const DisplayTrack = ({ currentTrack }) => {
    return (
        <div>
            <audio src={currentTrack.src} controls />
        </div>
    )
};
export default DisplayTrack;
