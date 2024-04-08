import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
// import SingleSongComponent from '../../Songs/AllSongs/SingleSongComponent'
import './PlaylistsView.css'
import { useNavigate, NavLink } from "react-router-dom"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlay, FaPause } from "react-icons/fa";
import { IconContext } from "react-icons";
import { PlayerContext } from "../../../context/PlayerContext";
import { useContext } from "react";


const SinglePlaylistComponent = ({ playlist }) => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate();
    const { currentSong, setCurrentSong, setIsPlaying, isPlaying, playOnePlaylist } = useContext(PlayerContext);
    const [isHovering, setIsHovering] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const song = playlist.songs[0]

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    useEffect(() => {
        if (!isHovering) setShowMenu(false)
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, isHovering]);


    return (
        <div
            className="singlePlaylistDiv"
        >
            <div className="playlistDiv">
                <div className="playlistInfo">
                    <div
                        className="playlist-img-buttons-container"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        <button
                            className="no-bg-button"
                            onClick={() => navigate(`/playlists/${playlist?.id}`)}
                        >
                            <img
                                src={playlist?.playlist_image}
                                className="playlistComponentImg"
                            />
                        </button>

                        {
                            isHovering
                            &&
                            <>
                                <IconContext.Provider value={{
                                    color: "#ff5500",
                                    size: "70px"
                                }}>
                                    <button
                                        className="no-bg-button play-button"
                                        onClick={() => {
                                            // if (!isPlaying) {
                                            //     setCurrentSong(song);
                                            //     setIsPlaying(true);
                                            // } else{
                                            //     setIsPlaying(false);
                                            // }
                                            playOnePlaylist(playlist.songs);
                                        }}>
                                        {/* {!isPlaying || currentSong !== song ?
                                    <FaPlay className="play-pause-image" />
                                    :
                                    <FaPause className="play-pause-image" />
                                } */}
                                        <FaPlay className="play-pause-image" />
                                    </button>
                                </IconContext.Provider>
                                <IconContext.Provider value={{
                                    color: "white",
                                    size: "22px"
                                }}>
                                    {user &&
                                        <>
                                            <button className="no-bg-button options-menu"
                                                onClick={toggleMenu}
                                                alt={"Options"}>
                                                <HiOutlineDotsHorizontal />
                                            </button>
                                            {showMenu && (
                                                <ul ref={ulRef} className="options-dropdown">
                                                    <li className="options-buttons">
                                                        <NavLink to={`/playlists/${playlist.id}`} className={"title"}>
                                                            <button>Go to Playlist Page</button>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            )}
                                        </>
                                    }
                                </IconContext.Provider>
                            </>
                        }
                    </div>
                    <div>
                        <h3 className="playlistDivTitle" >{playlist?.title}</h3>
                        <p className="playlistDivOwner">{playlist?.owner?.username}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SinglePlaylistComponent;
