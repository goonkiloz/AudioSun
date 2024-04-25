import { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { playOneThunk } from '../redux/queue';

export const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
    // const dispatch = useDispatch();
    // const songQueue = useSelector(state => state.queue.songs);
    // const [currentSong, setCurrentSong] = useState(undefined);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [timeProgress, setTimeProgress] = useState(0);
    // const [songIndex, setSongIndex] = useState(0);

    // const playOne = async (song) => {
    //     await dispatch(playOneThunk([song]));
    //     setSongIndex(0);
    //     setIsPlaying(true);
    // };

    return (
        <PlayerContext.Provider value={{
            currentSong, setCurrentSong,
            isPlaying, setIsPlaying,
            timeProgress, setTimeProgress,
            songIndex, setSongIndex,
            playOne, songQueue
        }}>
            {children}
        </PlayerContext.Provider>
    );
}
