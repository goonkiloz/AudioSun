const DisplayTrack = ({ currentTrack }) => {
    return (
        <div>
            <audio src={currentTrack.file_path} controls />
        </div>
    )
};
export default DisplayTrack;
