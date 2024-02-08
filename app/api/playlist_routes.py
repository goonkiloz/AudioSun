from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Song, db, Comment
from ..forms import NewSongForm, NewCommentForm

playlist_routes = Blueprint('playlists', __name__)


# Get all playlists belongs to a user
@playlist_routes.route('/', methods=['GET'])
@login_required
def get_playlists():
    """
    Query for all playlist that belongs to current user
    """
    return

# Add a song to a playlist
@playlist_routes.route('/<int:playlist_id>/songs', methods=['PUT', 'PATCH'])
@login_required
def add_song_to_playlist(playlist_id):
    """
    add a song to the playlist selected
    the playlist selected should owned by current user
    """
    return

# Remove a song from a playlist
@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def remove_song_to_playlist(playlist_id, song_id):
    """
    add a song to the playlist selected
    the playlist selected should owned by current user
    """
    return
