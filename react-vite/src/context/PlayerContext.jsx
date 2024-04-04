import { createContext, useContext, useState } from 'react';

export const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
    // const songQueue = [];
    // const [currentSong, setCurrentSong] = useState(songArray[songIndex]);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [timeProgress, setTimeProgress] = useState(0);
    // const [songIndex, setSongIndex] = useState(0);

    // const playOneSong = (song) => {
    //     songQueue = [song];
    //     setSongIndex(0);
    //     setTimeProgress(0);
    //     setIsPlaying(true);
    // }

    return (
        <PlayerContext.Provider value={{
            // currentSong, setCurrentSong,
            // isPlaying, setIsPlaying,
            // timeProgress, setTimeProgress,
            // songIndex, setSongIndex,
            // songQueue, playOneSong
        }}>
            {children}
        </PlayerContext.Provider>
    );
}
