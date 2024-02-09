import "./SongsView.css"

const SingleSongView = (song) => {
    song = song.song
    if (!song) return <h2>Loading...</h2>

    return (
        <div className="songContainer">
            {song.title}
        </div>
    )
}

export default SingleSongView;
