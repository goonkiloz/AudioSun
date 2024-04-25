import { NavLink } from "react-router-dom";
import ProfileButton from "../../ProfileButton"
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const currentUser = useSelector(state => state.session.user)

  // const handleOnClick = (e) => {
  //   e.preventDefault();
  //   alert(`Feature to come later!`)
  // }

  return (
    <div className="page-container">
      <div className="navbar-container">

        <NavLink className='navbar-logo container' to="/">
          <img className='navbar-logo' src="/logo.png" alt="Home" />
        </NavLink>

        <NavLink className='navbar-home' to="/">
          Home
        </NavLink>

        {/* <form className="navbar-search">
            <input
            type="text"
            placeholder="Search..."
            value='Feature coming soon'
            />
            <button
              type="submit"
              onClick={handleOnClick}

            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form> */}

        <NavLink className='navbar-playlists' to="/playlists">Playlists</NavLink>
        <NavLink className='navbar-songs' to="/songs">Songs</NavLink>
        <NavLink className='navbar-new-song' to='/songs/new'>Upload</NavLink>

        <div className="navbar-profile-container">
          {/* {currentUser && <div className="nav-username">{currentUser.username}</div>} */}
          <ProfileButton className='navbar-profile' user={currentUser} />
        </div>


      </div>
    </div>

  );
}

export default Navigation;
