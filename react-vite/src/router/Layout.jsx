import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../Screens/Global/Navigation/Components"
import Player from "../Screens/Player/Player";
import { PlayerContext } from "../context/PlayerContext";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <PlayerContext.Provider value={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }}>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
          <Player />
        </PlayerContext.Provider>
      </ModalProvider>
    </>
  );
}
