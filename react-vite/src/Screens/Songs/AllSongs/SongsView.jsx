import { useDispatch, useSelector } from "react-redux"
import { getSongsThunk } from "../../../redux/songs"
import { memo, useEffect } from "react";
import "./SongsView.css";
import AddSong from "../../Playlist/AddSongModal";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import { getCurrentUserPlaylistsThunk } from "../../../redux/playlists";
import SingleSongComponent from "./SingleSongComponent";

const SongsView = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs.allSongs);
    const currentUser = useSelector(state => state.session.user);
    const mostRecentSongs = [songs[songs.length - 1], songs[songs.length - 2], songs[songs.length - 3], songs[songs.length - 4]];
    const rockFilter = songs.filter(song => song.genre.toLowerCase() === "rock");
    let rockSongs = [];
    if (rockFilter.length > 4) {
        rockSongs = [rockFilter[rockFilter.length - 4], rockFilter[rockFilter.length - 3], rockFilter[rockFilter.length - 2], rockFilter[rockFilter.length - 1]]
    } else {
        rockSongs = rockFilter.reverse();
    }
    console.log(rockSongs);


    useEffect(() => {
        dispatch(getSongsThunk());
        // dispatch(getCurrentUserPlaylistsThunk())
    }, [dispatch]);

    if (!songs && !mostRecentSongs && !rockSongs) return <h1>Loading...</h1>

    return (
        <div>
            <div className="songsContainer">
                <h1>Most Recent Songs</h1>
                {mostRecentSongs?.map((song) => (
                    <div key={song?.id} className="songBox">
                        <SingleSongComponent song={song} />
                        {currentUser !== null &&
                            <OpenModalButton
                                modalComponent={<AddSong songId={song?.id} />}
                                buttonText={'Add to Playlist'}
                            />
                        }
                    </div>
                ))}
            </div>
            <div className="songsContainer">
                <h1>Rock Songs</h1>
                {rockSongs?.map((song) => (
                    <div key={song?.id} className="songBox">
                        <SingleSongComponent song={song} />
                        {currentUser !== null &&
                            <OpenModalButton
                                modalComponent={<AddSong songId={song?.id} />}
                                buttonText={'Add to Playlist'}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};

export default memo(SongsView);
