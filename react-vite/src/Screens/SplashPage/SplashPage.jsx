import { useDispatch, useSelector } from "react-redux"
import SingleSongComponent from "../Songs/AllSongs/SingleSongComponent";
import { useEffect } from "react";
import { getSongsThunk } from "../../redux/songs";

const SplashPage = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs);
    const mostRecentSongs = [songs[songs.length - 1], songs[songs.length - 2], songs[songs.length - 3], songs[songs.length - 4]];

    useEffect(() => {
        dispatch(getSongsThunk());
        // dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch]);

    return (
        <div className="songsview-outer-container">
            <p>
                <h1>Welcome to Audiosun</h1>
            </p>
            <h1>Most Recent Songs</h1>
            <div className="songsContainer">
                {mostRecentSongs?.map((song) => (
                    <div key={song?.id} className="songbox">
                        <SingleSongComponent song={song} />
                        {/* {currentUser !== null &&
                            <OpenModalButton
                                modalComponent={<AddSong songId={song?.id} />}
                                buttonText={'Add to Playlist'}
                            />
                        } */}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SplashPage;
