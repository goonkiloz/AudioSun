import "./AllLikes.css";
import { getLikesThunk } from "../../../redux/likes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllLikesView = (song) => {
  const dispatch = useDispatch();

  const currentSong = song.song;
  const likes = useSelector((state) => state.likes?.allLikes);

  useEffect(() => {
    dispatch(getLikesThunk(currentSong.id));
  }, [dispatch, currentSong]);

  if (!likes) return <div>Loading...</div>;

  if (likes.length === 0) {
    return <h2>No like for this song yet!</h2>;
  }

  return (
    <div>
      {/* <h2>{likes.length} {likes.length === 1 ? 'like' : 'likes'} </h2> */}
      <div className="users-likes-container">
        <h2>Users who like the song:</h2>
        <div className="user-id-map">
          {likes.map((like) => (
            <div key={like.id}>
              <span className="user-id-circle">
                {like.user_first_name?.slice(0, 1) + like.user_last_name?.slice(0, 1) }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLikesView;
