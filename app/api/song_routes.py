from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import Song, User, db
from ..forms import NewSongForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/new', methods=["POST"])
@login_required
def new_song():
    form = NewSongForm()
    user = current_user.to_dict()
    if form.validate_on_submit():
        data = form.data
        new_song = Song(
            title=data["title"],
            genre=data["genre"],
            description=data["description"],
            file_path=data["title"],
            privacy=data["privacy"],
            user_id=1
        )
        db.session.add(new_song)
        db.session.commit()
        return redirect("/")
    return form.errors, 401
