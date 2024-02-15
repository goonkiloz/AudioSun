const DisplayTrack = ({ currentTrack }) => {
    return (
        <div>
            <audio src={currentTrack} controls />
        </div>
    )
};
export default DisplayTrack;
