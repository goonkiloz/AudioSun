import "./SongsView.css"
import CommentsView from "../../Comments/AllComments/CommentsView"
import { getSingleSongThunk } from "../../../redux/songs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import AllLikesView from "../../Likes/AllLikes/AllLikesView";
import LikeOrRemoveLike from "../../Likes/AllLikes/LikeOrRemoveLike";

const SingleSongPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { songId } = useParams();
    const currentSong = useSelector(state => state.songs.byId[songId])
    // console.log(currentSong)

    useEffect(() => {
        const fetchData = async () => {

            const res = await dispatch(getSingleSongThunk(songId))
            if(res.error) {
                //console.error("Error fetching song:", res)
                navigate('/*')
            }
        };

        fetchData();

    }, [dispatch, songId, navigate]);

    if (!currentSong) return <h2>Loading...</h2>

    return (
        <div className="songContainer">
            <h2>Title: {currentSong.title}</h2>
            <LikeOrRemoveLike song={currentSong} />
            <div>Description: {currentSong.description}</div>
            <div>Genre: {currentSong.genre}</div>
            <div>Artist: {currentSong.artist.username}</div>
            <CommentsView song={currentSong} />

            <AllLikesView song={currentSong} />
        </div>
    )
}

export default memo(SingleSongPage);
