import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../Screens/Login/LoginFormPage';
import SignupFormPage from '../Screens/Signup/SignupFormPage';
import SongsView from '../Screens/Songs/AllSongs/SongsView';
import NewSongForm from '../Screens/Songs/New Song'
import Layout from './Layout';
import SplashPage from '../Screens/SplashPage';
import SingleSongPage from '../Screens/Songs/AllSongs/SingleSongPage';
import ProfileView from '../Screens/Profile/ProfileView';
import PlaylistsView from '../Screens/Playlist/AllPlaylists/PlaylistsView';
import SinglePlaylistView from '../Screens/Playlist/AllPlaylists/SinglePlaylistPage';
import NotFoundPage from '../Screens/NotFound/NotFoundPage';
import NewPlaylistForm from '../Screens/Playlist/CreatePlaylist';
import CurrentUserPlaylistsPage from '../Screens/Playlist/CurrentUserPlaylists';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "songs",
        element: <SongsView />
      },
      {
        path: "songs/new",
        element: <NewSongForm />
      },
      {
        path: "songs/:songId",
        element: <SingleSongPage />
      },
      {
        path: "profile",
        element: <ProfileView />
      },
      {
        path: "playlists",
        element: <PlaylistsView />
      },
      {
        path: "playlists/current",
        element: <CurrentUserPlaylistsPage />
      },
      {
        path: "playlists/:playlistId",
        element: <SinglePlaylistView />
      },
      {
        path: 'playlists/new',
        element: <NewPlaylistForm />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ],
  },
]);
