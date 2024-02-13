import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../Screens/Login/LoginFormPage';
import SignupFormPage from '../Screens/Signup/SignupFormPage';
import SongsView from '../Screens/Songs/AllSongs/SongsView';
import NewSongForm from '../Screens/Songs/New Song'
import Layout from './Layout';
import SingleSongView from '../Screens/Songs/AllSongs/SingleSongView';
import ProfileView from '../Screens/Profile/ProfileView';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <>
          <h1>Welcome!</h1>
          <a href="/songs">View All Songs</a>
        </>
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
        element: <SingleSongView />
      },
      {
        path: "profile",
        element: <ProfileView />
      },
    ],
  },
]);
