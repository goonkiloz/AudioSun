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
  const { setCurrentSong } = useContext(PlayerContext);

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
              <li className="profile-dropdown-user-email">{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button onClick={() => {
                  closeMenu();
                  navigate("/profile")
                }}>My Songs</button>
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
              <button>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </button>
              <button>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </button>

            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
