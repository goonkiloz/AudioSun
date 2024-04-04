import "./SingleSongComponent.css";
import { useSelector } from "react-redux";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../../Global/OpenModalButton/OpenModalButton";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlay, FaPause } from "react-icons/fa";
import { IconContext } from "react-icons";
import AddSong from "../../Playlist/AddSongModal";

const SingleSongComponent = (song) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const { currentSong, setIsPlaying, isPlaying, playOneSong } =
    useContext(PlayerContext);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  song = song.song;

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (!isHovering) setShowMenu(false);
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, isHovering]);

  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="songContainer">
      <div
        className="img-buttons-container"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <button
          className="no-bg-button"
          onClick={() => navigate(`/songs/${song?.id}`)}
        >
          <img src={song?.song_image} className="song-image" />
        </button>
        {isHovering && (
          <>
            <IconContext.Provider
              value={{
                color: "#ff5500",
                size: "70px",
              }}
            >
              <button
                className="no-bg-button play-button"
                onClick={() => {
                  if (!isPlaying || currentSong !== song) {
                    playOneSong(song);
                  } else {
                    setIsPlaying(false);
                  }
                }}
              >
                {!isPlaying || currentSong !== song ? (
                  <FaPlay className="play-pause-image" />
                ) : (
                  <FaPause className="play-pause-image" />
                )}
              </button>
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                color: "white",
                size: "22px",
              }}
            >
              {user && (
                <>
                  <button
                    className="no-bg-button options-menu"
                    onClick={toggleMenu}
                    alt={"Options"}
                  >
                    <HiOutlineDotsHorizontal />
                  </button>
                  {showMenu && (
                    <ul ref={ulRef} className="options-dropdown">
                      <li className="options-buttons">
                        <OpenModalButton
                          modalComponent={<AddSong songId={song?.id} />}
                          buttonText={"Add to Playlist"}
                        />
                      </li>
                      <li className="options-buttons">
                        <NavLink to={`/songs/${song?.id}`} className={"title"}>
                          <button>Go to Song Page</button>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}
            </IconContext.Provider>
          </>
        )}
      </div>
      {/* {user?.id === song?.user_id &&
                <OpenModalButton
                    modalComponent={<EditSongModal song={song} />}
                    buttonText="Edit Song"
                />
            }
            {user?.id === song?.user_id &&
                <OpenModalButton
                    modalComponent={<DeleteSongModal songId={song?.id} />}
                    buttonText="Delete Song"
                />
            } */}
      <h3 className="song-title">{song?.title}</h3>
      <div>{song?.artist.username}</div>
    </div>
  );
};

export default memo(SingleSongComponent);
