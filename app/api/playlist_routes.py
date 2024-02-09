from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Song, db, Playlist
from ..forms import NewSongForm, NewCommentForm

playlist_routes = Blueprint("playlists", __name__)


# Get all playlists without login
@playlist_routes.route("/", methods=["GET"])
def get_playlists():
    """
    Query for all playlists without login in
    """
    all_playlists = Playlist.query.all()
    return {"playlists": [playlist.to_dict() for playlist in all_playlists]}


# Get all playlists by current user
@playlist_routes.route("/current", methods=["GET"])
@login_required
def get_playlists_by_user():
    """
    Query for all playlists without login in
    """
    all_playlists_by_user = Playlist.query.filter(Playlist.user_id == current_user.id)
    return {"playlists": [playlist.to_dict() for playlist in all_playlists_by_user]}


# Get all playlists by particular song
@playlist_routes.route("/<int:song_id>", methods=["GET"])
def get_playlists_by_song_id(song_id):
    """
    Query for all playlists by song ID
    """

    all_playlists_by_song_id = Playlist.query.filter(Playlist.songs.any(id=song_id)).all()
    return {"playlists": [playlist.to_dict() for playlist in all_playlists_by_song_id]}


# Add a song to a playlist
@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["POST"])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    """
    add a song to the playlist selected
    the playlist selected should owned by current user
    """
    current_playlist = Playlist.query.get(playlist_id)

    if not current_playlist:
        return {"error": "No playlist is found"}, 404

    if current_user.id != current_playlist.user_id:
        return {"error": "Not Authorized"}, 403

    song = Song.query.get(song_id)

    current_playlist.songs.append(song)
    db.session.commit()
    return {'message':'song added to the current playlist'}


# Remove a song from a playlist
@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["DELETE"])
@login_required
def remove_song_from_playlist(playlist_id, song_id):
    """
    add a song to the playlist selected
    the playlist selected should owned by current user
    """

    current_playlist = Playlist.query.get(playlist_id)
    if not current_playlist:
        return {"error": "no playlist is found"}, 404

    if current_playlist.user_id != current_user.id:
        return {"error": "Not Authorized"}, 403

    song = Song.query.get(song_id)
    if not song:
        return {'error': 'no song is found'}, 404

    current_playlist.songs.remove(song)
    db.session.commit()

    return {"message": "succcessfully deleted"}
