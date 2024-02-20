import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalButton/OpenModalMenuItem";
import LoginFormModal from "../Login/LoginFormModal"
import SignupFormModal from "../Signup/SignupFormModal";
import { useContext } from "react";
import './ProfileButton.css';
import { PlayerContext } from "../../context/PlayerContext";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const { setIsPlaying, setCurrentSong } = useContext(PlayerContext);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    setIsPlaying(false)
    setCurrentSong("")
    navigate(`/`)
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button onClick={() => {
                  closeMenu();
                  navigate("/profile")
                }}>View Profile</button>
              </li>
              <li>
                <button onClick={() => {
                  closeMenu();
                  navigate('/playlists/current')
                }}>
                  My Playlists
                </button>
              </li>
              <li>
                <button onClick={() => {
                  closeMenu();
                  navigate("/songs/new")
                }}>Upload Song</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
