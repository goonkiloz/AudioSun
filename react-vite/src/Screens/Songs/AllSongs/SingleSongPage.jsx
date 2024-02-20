import "./SongsView.css"
import CommentsView from "../../Comments/AllComments/CommentsView"
import { getSingleSongThunk } from "../../../redux/songs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useContext } from "react";
import { PlayerContext } from "../../../context/PlayerContext";
import AllLikesView from "../../Likes/AllLikes/AllLikesView";
import LikeOrRemoveLike from "../../Likes/AllLikes/LikeOrRemoveLike";
import './SongsView.css'
const SingleSongPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { songId } = useParams();
    const song = useSelector(state => state.songs.byId[songId])
    const user = useSelector(state => state.session.user)
    const { setCurrentSong, setIsPlaying, currentSong } = useContext(PlayerContext);

    useEffect(() => {
        const fetchData = async () => {

            const res = await dispatch(getSingleSongThunk(songId))
            if (res.error) {
                //console.error("Error fetching song:", res)
                navigate('/*')
            }
        };

        fetchData();

    }, [dispatch, songId, navigate]);

    if (!song) return <h2>Loading...</h2>

    return (
        <div className="single-song-page songContainer">
            <div>
                <img className='song-img' src={song.song_image} />
            </div>

            <div>
                <h2>Title: {song.title}</h2>
                <LikeOrRemoveLike song={song} />
                <div>Description: {song.description}</div>
                <div>Genre: {song.genre}</div>
                <div>Artist: {song.artist.username}</div>
                <button onClick={() => {
                    // setIsPlaying(false);
                    // setCurrentSong(null)
                    setCurrentSong(song);
                    // setTimeProgress(0);
                    // setIsPlaying(true);
                }}>Play</button>
            </div>

            <CommentsView song={song} />

            <AllLikesView song={song} />
        </div>
    )
}

export default SingleSongPage;
