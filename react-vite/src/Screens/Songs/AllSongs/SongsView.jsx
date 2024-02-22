import { useDispatch, useSelector } from "react-redux"
import { getSongsThunk } from "../../../redux/songs"
import { memo, useEffect } from "react";
import "./SongsView.css";
import SingleSongComponent from "./SingleSongComponent";

const SongsView = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs);
    // const currentUser = useSelector(state => state.session.user);
    const mostRecentSongs = [songs[songs.length - 1], songs[songs.length - 2], songs[songs.length - 3], songs[songs.length - 4]];
    const rockFilter = songs.filter(song => song.genre.toLowerCase() === "rock");
    const hipHopFilter = songs.filter(song => song.genre.toLowerCase() === "country");
    const popFilter = songs.filter(song => song.genre.toLowerCase() === "pop");
    let rockSongs = [];
    let hipHopSongs = [];
    let popSongs = [];
    if (rockFilter.length > 4) {
        rockSongs = [rockFilter[rockFilter.length - 4], rockFilter[rockFilter.length - 3], rockFilter[rockFilter.length - 2], rockFilter[rockFilter.length - 1]]
    } else {
        rockSongs = rockFilter.reverse();
    }
    if (hipHopFilter.length > 4) {
        hipHopSongs = [hipHopFilter[hipHopFilter.length - 4], hipHopFilter[hipHopFilter.length - 3], hipHopFilter[hipHopFilter.length - 2], hipHopFilter[hipHopFilter.length - 1]]
    } else {
        hipHopSongs = hipHopFilter.reverse();
    }
    if (popFilter.length > 4) {
        popSongs = [popFilter[popFilter.length - 4], popFilter[popFilter.length - 3], popFilter[popFilter.length - 2], popFilter[popFilter.length - 1]]
    } else {
        popSongs = popFilter.reverse();
    }

    useEffect(() => {
        dispatch(getSongsThunk());
        // dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch]);

    if (!songs && !mostRecentSongs && !rockSongs) return <h1>Loading...</h1>

    return (
        <div className="songsview-outer-container">
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
            <h1>Rock Songs</h1>
            <div className="songsContainer">
                {rockSongs?.map((song) => (
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
            <h1>Hip Hop Songs</h1>
            <div className="songsContainer">
                {hipHopSongs?.map((song) => (
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
            <h1>Pop Songs</h1>
            <div className="songsContainer">
                {popSongs?.map((song) => (
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

export default memo(SongsView);
