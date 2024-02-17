import { createContext, useContext, useState } from 'react';

export const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    console.log(isPlaying);

    return (
        <PlayerContext.Provider value={{
            currentSong, setCurrentSong,
            isPlaying, setIsPlaying
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
