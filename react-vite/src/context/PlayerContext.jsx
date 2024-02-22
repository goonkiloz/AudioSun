import { createContext, useContext, useState } from 'react';

export const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeProgress, setTimeProgress] = useState(0);
    console.log(isPlaying);

    return (
        <PlayerContext.Provider value={{
            currentSong, setCurrentSong,
            isPlaying, setIsPlaying,
            timeProgress, setTimeProgress
        }}>
            {children}
        </PlayerContext.Provider>
    );
}
