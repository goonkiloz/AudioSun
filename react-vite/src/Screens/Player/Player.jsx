import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../redux/songs";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import { tracks } from "../../data/tracks";
import "./Player.css"

const Player = () => {
    const dispatch = useDispatch();
    const stateQueue = useSelector((state) => state.queue.allsongs)

    useEffect(() => {
        const queue = stateQueue
        console.log(queue);

    }, [stateQueue]);

    const [currentTrack, setCurrentTrack] = useState('');
    return (
        <span className="player-box">
            <h2>Player</h2>
            {/* {queue?.length > 0 &&
                <div className="inner">
                    <DisplayTrack currentTrack={currentTrack.file_path} />
                    <Controls />
                    <ProgressBar />
                </div>
            } */}
        </span>
    )
};

export default Player
