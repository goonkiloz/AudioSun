from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import Song, db
from ..forms import NewSongForm

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/current')
@login_required
def current_songs():
    """
    Query for all songs owned by current user and returns them in a list of song dictionaries
    """
    songs = Song.query.filter(Song.user_id == current_user.id)
    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/', methods=["POST"])
@login_required
def new_song():
    form = NewSongForm()
    if form.validate_on_submit():
        data = form.data
        new_song = Song(
            title=data["title"],
            genre=data["genre"],
            description=data["description"],
            file_path=data["title"],
            privacy=data["privacy"],
            user_id=current_user.id
        )
        db.session.add(new_song)
        db.session.commit()
        return redirect("/")
    return form.errors, 401


@song_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def update_song(id):
    form = NewSongForm()
    song = Song.query.get(id)
    if song["user_id"] != current_user.id:
        return {'error': "Not Authorized"}
    if form.validate_on_submit():
        data = form.data
        song.title=data["title"]
        song.genre=data["genre"]
        song.description=data["description"]
        song.file_path=data["title"]
        song.privacy=data["privacy"]

        db.session.commit()
        return redirect("/")
    return form.errors, 401


@song_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get(id)
    if song["user_id"] != current_user.id:
        return {'error': "Not Authorized"}

    db.session.delete(song)
    db.session.commit()
    return redirect("/")
