import { useState } from "react"
// import SingleSongComponent from '../../Songs/AllSongs/SingleSongComponent'
import './PlaylistsView.css'
import { useNavigate } from "react-router-dom"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";
import { PlayerContext } from "../../../context/PlayerContext";
import { useContext } from "react";


const SinglePlaylistComponent = ({ playlist }) => {
    const { setCurrentSong } = useContext(PlayerContext);
    const [isHovering, setIsHovering] = useState(false)
    const navigate = useNavigate()

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const SongComponent = ({ playlist }) => {
        return (
            <div>
                <IconContext.Provider value={{
                    color: "red",
                    size: "35px"
                }}
                >
                    <FaPlay
                        className="playlist-play-button"
                        onClick={() => {
                            // setIsPlaying(false);
                            // setCurrentSong(null);
                            setCurrentSong(playlist?.songs[0]);
                            // setIsPlaying(true);
                        }}
                    />
                </IconContext.Provider>
                <IconContext.Provider value={{
                    color: "white",
                    size: "22px"
                }}>
                    <div className="playlist-options-menu">
                        <HiOutlineDotsHorizontal />
                    </div>
                </IconContext.Provider>
            </div>

            // <div className="songDiv">
            //     {playlist?.songs?.slice(0, 6).map((song) => {
            //         return(
            //             <div className="playlistSongContainer" onClick={() => navigate(`/songs/${song?.id}`)}>
            //                 <img src={song?.song_image} className="songImg"/>
            //                 <div className="songInfo">
            //                     <h3 className="songTitle">{song?.title}</h3>
            //                     <p className="songArtist">Artist: {song?.artist?.username}</p>
            //                 </div>
            //             </div>
            //         )
            //     })}
            //     {playlist.songs.length > 6 &&
            //     <button
            //         className="showMoreButton"
            //         onClick={() => navigate(`/playlists/${playlist.id}`)}
            //     >show more</button>}
            // </div>
        )
    }


    return (
        <div
            className="singlePlaylistDiv"
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
        >
            <div className="playlistDiv">
                <div className="playlistInfo">
                    <div
                        className="playlist-img-buttons-container"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        <img
                            src={playlist?.playlist_image}
                            className="playlistComponentImg"
                        />
                        {
                            isHovering
                            &&
                            <SongComponent playlist={playlist} />
                        }
                    </div>
                    <div onClick={() => navigate(`/playlists/${playlist.id}`)}>
                        <h3 className="playlistDivTitle" >{playlist?.title}</h3>
                        <p className="playlistDivOwner">{playlist?.owner?.username}</p>
                    </div>
                </div>
            </div>
            {/* {
                isHovering
                &&
                <SongComponent playlist={playlist}/>
                } */}
        </div>

    )
}

export default SinglePlaylistComponent;
