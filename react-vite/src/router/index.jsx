import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../Screens/Login/LoginFormPage';
import SignupFormPage from '../Screens/Signup/SignupFormPage';
import SongsView from '../Screens/Songs/AllSongs/SongsView';
import NewSongForm from '../Screens/Songs/New Song'
import Layout from './Layout';
import SingleSongPage from '../Screens/Songs/AllSongs/SingleSongPage';
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
        element: <SingleSongPage />
      },
      {
        path: "profile",
        element: <ProfileView />
      },
    ],
  },
]);
