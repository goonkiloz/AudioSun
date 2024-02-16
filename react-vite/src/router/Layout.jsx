import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../Screens/Global/Navigation/Components"
import Player from "../Screens/Player/Player";
import PlayerProvider from "../context/PlayerContext";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <PlayerProvider>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
          <Player />
        </PlayerProvider>
      </ModalProvider>
    </>
  );
}
