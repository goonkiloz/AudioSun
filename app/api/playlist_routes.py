from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Song, db, Playlist, Like
from ..forms import NewSongForm, NewCommentForm, NewPlaylistForm

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


# Get all songs in for a specific playlist
@playlist_routes.route("/<int:playlist_id>/songs", methods=["GET"])
def get_songs_from_playlist(playlist_id):
    """
    Query for all songs in a specific playlist
    """
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return {"error": "Playlist not found"}, 404

    songs_in_playlist = playlist.songs
    return {"songs": [song.to_dict() for song in songs_in_playlist]}

# Get all playlists by particular song
@playlist_routes.route("/<int:song_id>", methods=["GET"])
def get_playlists_by_song_id(song_id):
    """
    Query for all playlists by song ID
    """

    all_playlists_by_song_id = Playlist.query.filter(Playlist.songs.any(id=song_id)).all()
    return {"playlists": [playlist.to_dict() for playlist in all_playlists_by_song_id]}

# @playlist_routes.route("/<int:playlist_id>", methods=["GET"])
# def get_playlists_by_user(playlist_id):
#     """
#     Query for a playlist without login in
#     """
#     playlist = Playlist.query.get(playlist_id)
#     return {"playlists": playlist.to_dict()}

@playlist_routes.route('/', methods=["POST"])
@login_required
def new_playlist():
    """
    Create a new playlist
    """
    form = NewPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_playlist = Playlist(
            title=data["title"],
            description=data['description'],
            playlist_image=data["playlist_image"],
            user_id=current_user.id
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    return form.errors, 401

@playlist_routes.route('/<int:playlist_id>', methods=["PUT", "PATCH"])
@login_required
def edit_playlist(playlist_id):
    """
    Edits a playlist
    """
    current_playlist = Playlist.query.get(playlist_id)

    if not current_playlist:
        return {"error": "No playlist is found"}, 404

    if current_user.id != current_playlist.user_id:
        return {"error": "Not Authorized"}, 403

    form = NewPlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        current_playlist.title=data["title"]
        current_playlist.description=data["description"]
        current_playlist.playlist_image=data["playlist_image"]

        db.session.commit()
        return current_playlist.to_dict()
    return form.errors, 401


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

@playlist_routes.route("/<int:playlist_id>", methods=["DELETE"])
@login_required
def remove_playlist(playlist_id):
    """
    Delete a playlist
    """

    current_playlist = Playlist.query.get(playlist_id)

    if not current_playlist:
        return {"error": "No playlist is found"}, 404

    if current_user.id != current_playlist.user_id:
        return {"error": "Not Authorized"}, 403

    db.session.delete(current_playlist)
    db.session.commit()
    return {'message':'succcessfully deleted'}, 200

@playlist_routes.route('/<int:playlist_id>/likes', methods=['GET'])
def get_likes_for_song(playlist_id):
    """
    Query for all likes based on playlist id and returns likes for that playlist id
    """

    current_playlist_likes = Like.query.filter(Like.playlist_id == playlist_id).all()

    if not current_playlist_likes:
        return {'error': 'no likes were found'}, 404
    return {'likes': [like.to_dict() for like in current_playlist_likes]}


@playlist_routes.route("/<int:playlist_id>/likes", methods=["POST"])
@login_required
def add_like_for_playlist(playlist_id):
    """
    Add a like based on the playlist id and user id
    """
    like_check = Like.query.filter(Like.playlist_id == playlist_id, Like.user_id == current_user.id).all()

    if like_check:
        return {"error": "like already exists"}

    new_like = Like(
        playlist_id=playlist_id,
        user_id=current_user.id
    )
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()


# @playlist_routes.route('/<int:playlist_id>/likes/<like_id>', methods=['DELETE'])
# @login_required
# def remove_like_for_song(like_id):
#     """
#     Remove a like based on the playlist id and user id
#     """
#     current_like = Like.query.get(like_id)

#     if current_like.user_id != current_user.id:
#         return {'error': "Not Authorized"}

#     if not current_like:
#         return {'error': 'no like was found'}, 404

#     db.session.delete(current_like)
#     db.session.commit()
#     return {'message': 'success'}, 200
