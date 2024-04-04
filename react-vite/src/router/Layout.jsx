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
  let songQueue = [];
  const [isLoaded, setIsLoaded] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songQueue[songIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);

  const playOneSong = (song) => {
    songQueue.shift();
    songQueue.unshift(song);
    setSongIndex(0);
    setCurrentSong(songQueue[songIndex])
    setIsPlaying(true);
  };

  const addOneToQueue = (song) => {
    songQueue.push(song)
    console.log("adding");
    console.log(songQueue);
  };

  const addListToQueue = (songs) => {
    songs.forEach(song => {
      songQueue.push(song)
    })
    console.log("adding");
    console.log(songQueue);
  };

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <PlayerContext.Provider value={{
          currentSong, setCurrentSong,
          isPlaying, setIsPlaying,
          timeProgress, setTimeProgress,
          songIndex, setSongIndex,
          songQueue, playOneSong,
          addOneToQueue, addListToQueue
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
