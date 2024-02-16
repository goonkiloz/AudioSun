import { createContext, useContext, useState } from 'react';

export const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export default function PlayerProvider({ children }) {
    const [currentSong, setCurrentSong] = useState('');

    return (
        <PlayerContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </PlayerContext.Provider>
    );
};
