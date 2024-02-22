import { useDispatch, useSelector } from "react-redux"
import SingleSongComponent from "../Songs/AllSongs/SingleSongComponent";
import { useEffect } from "react";
import { getSongsThunk } from "../../redux/songs";
import "./SplashPage.css"

const SplashPage = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs);
    const mostRecentSongs = [songs[songs.length - 1], songs[songs.length - 2], songs[songs.length - 3], songs[songs.length - 4]];

    useEffect(() => {
        dispatch(getSongsThunk());
        // dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch]);

    return (
        <div className="splash-page-container">
            <img className='splash-img' src="/splash.png" alt="splash" />
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
            <footer className="splash-page-footer">
                <p>©2024, developed by Brendan, Eddie and Joel for educational purpose.</p>
                <div>
                    <a href="https://github.com/goonkiloz">Brendan&apos;s Github | </a>
                    <a href="https://github.com/edison914">Eddie&apos;s Github | </a>
                    <a href="https://github.com/urfavoritejoel">Joel&apos;s Github</a>
                </div>

            </footer>
        </div>
    )
};

export default SplashPage;
