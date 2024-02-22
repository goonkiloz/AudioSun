import { NavLink } from "react-router-dom";
import ProfileButton from "../../ProfileButton"
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const currentUser = useSelector(state => state.session.user)

  return (
    <div className="page-container">
        <div className="navbar-container">

          <NavLink className='navbar-logo container' to="/">
            <img className='navbar-logo' src="/logo.png" alt="Home" />
          </NavLink>

          <NavLink className='navbar-home' to="/songs">
            Home
          </NavLink>

          <form className="navbar-search">
            <input
            type="text"
            placeholder="Search..."
            value='Feature coming soon'
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <NavLink className='navbar-playlists' to="/playlists">Playlists</NavLink>
          <NavLink className='navbar-songs' to="/profile">My Songs</NavLink>
          <NavLink className='navbar-new-song' to='/songs/new'>Upload</NavLink>

          <div className="navbar-profile-container">
            {currentUser && <div className="username">{currentUser.username}</div>}
            <ProfileButton className='navbar-profile'/>
          </div>


        </div>
    </div>

  );
}

export default Navigation;
