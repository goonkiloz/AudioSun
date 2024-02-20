import { NavLink } from "react-router-dom";
import ProfileButton from "../../ProfileButton"
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const currentUser = useSelector(state => state.session.user)

  return (
    <div className="navbar-container">

        <NavLink to="/">
          <img className='navbar-logo' src="/logo.png" alt="Home" />
        </NavLink>

        <NavLink className='navbar-playlists' to="/playlists">Playlists</NavLink>

        <NavLink className='navbar-new-song' to='/songs/new'>Upload song</NavLink>

        <div className="navbar-profile-container">
          {currentUser && <div className="username">{currentUser.username}</div>}
          <ProfileButton className='navbar-profile'/>
        </div>


    </div>
  );
}

export default Navigation;
