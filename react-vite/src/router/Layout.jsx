import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../Screens/Global/Navigation/Components"
import Player from "../Screens/Player/Player";
import { PlayerContext } from "../context/PlayerContext";
import { addToQueueThunk, playOneThunk } from "../redux/queue";

export default function Layout() {
  const dispatch = useDispatch();
  const songQueue = useSelector(state => state.queue.songs);
  const [currentSong, setCurrentSong] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const playOne = async (song) => {
    await dispatch(playOneThunk([song]));
    setSongIndex(0);
    setIsPlaying(true);
  };

  const addToQueue = async (songs) => {
    await dispatch(addToQueueThunk(songs));
  };

  const playOnePlaylist = async (songs) => {
    await dispatch(playOneThunk(songs));
    setSongIndex(0);
    setIsPlaying(true);
  };

  return (
    <>
      <ModalProvider>
        <PlayerContext.Provider value={{
          currentSong, setCurrentSong,
          isPlaying, setIsPlaying,
          timeProgress, setTimeProgress,
          songIndex, setSongIndex,
          playOne, addToQueue,
          playOnePlaylist, songQueue
        }}>
          <Navigation />
          {isLoaded && <Outlet />}
          <Modal />
          <Player />
        </PlayerContext.Provider>
      </ModalProvider>
    </>
  );
}
