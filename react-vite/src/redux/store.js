import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songsReducer from "./songs";
import commentsReducer from "./comments";
import playlistsReducer from './playlists'
import likesReducer from "./likes";
import userReducer from "./users";
import queueReducer from "./queue";


const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  comments: commentsReducer,
  playlists: playlistsReducer,
  likes: likesReducer,
  users: userReducer,
  queue: queueReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
