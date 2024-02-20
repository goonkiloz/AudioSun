import { NavLink } from "react-router-dom";
import ProfileButton from "../../ProfileButton"
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbar-container">

        <NavLink to="/">
          <img className='navbar-logo' src="/logo.png" alt="Home" />
        </NavLink>

        <NavLink className='navbar-playlists' to="/playlists">Playlists</NavLink>

        <NavLink className='navbar-new-song' to='/songs/new'>Upload song</NavLink>

        <ProfileButton className='navbar-profile'/>

    </div>
  );
}

export default Navigation;
