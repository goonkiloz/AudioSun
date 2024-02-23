import "./SongsView.css"
import CommentsView from "../../Comments/AllComments/CommentsView"
import { getSingleSongThunk } from "../../../redux/songs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useContext, useState } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import AllLikesView from "../../Likes/AllLikes/AllLikesView";
import LikeOrRemoveLike from "../../Likes/AllLikes/LikeOrRemoveLike";
import './SingleSongPage.css'
import NotFoundPage from "../../NotFound"

const SingleSongPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { songId } = useParams();
    const [doesExist, setDoesExist] = useState(true)
    const song = useSelector(state => state.songs.byId[songId])
    const { setCurrentSong } = useContext(PlayerContext);
    let resOk = true;

    // useEffect(() => {
    //     const fetchData = async () => {

    //         const res = await dispatch(getSingleSongThunk(songId))
    //         // if (Number(songId) !== songId) navigate('/*')
    //         if (res.error) {
    //             //console.error("Error fetching song:", res)
    //             navigate('/*')
    //         }
    //         console.log(res);
    //     };

    //     fetchData();

    // }, [dispatch, songId, navigate]);

    useEffect(() => {
        async function startDispatching() {
            const res = await dispatch(getSingleSongThunk(songId))
            if (!res.ok) {
                // navigate('/*')
                setDoesExist(false)
            }
        }

        startDispatching()
    }, [dispatch, songId, navigate])

    if (!doesExist) return <NotFoundPage />

    if (!song) return <h1>Loading...</h1>


    return (
        <div className="single-song-page-container">
            <div className="single-song-upper-section">
                <img className='song-img' src={song.song_image} />
                <div className="song-detail-view">
                    <h2>Title: {song.title}</h2>
                    <LikeOrRemoveLike song={song} />
                    <h3>Description: {song.description}</h3>
                    <h3>Genre: {song.genre}</h3>
                    <h3>Artist: {song.artist.username}</h3>
                    <button onClick={() => {
                        // setIsPlaying(false);
                        // setCurrentSong(null)
                        setCurrentSong(song);
                        // setTimeProgress(0);
                        // setIsPlaying(true);
                    }}>Play</button>
                </div>
            </div>

            <div className="single-song-lower-section">
                <div className="single-song-comment-view">
                    <CommentsView song={song} />
                </div>
                <div className="single-song-like-view">
                    <AllLikesView song={song} />
                </div>

            </div>

        </div>
    )
}

export default memo(SingleSongPage);
