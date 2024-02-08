from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Song, User, db, Comment
from ..forms import NewSongForm, NewCommentForm

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

#Eddie GET comments from a song
@song_routes.route('/<int:song_id>/comments', methods=['GET'])
def get_comments_for_song(song_id):
    """
    Query for all comments based on the song Id and returns the comments in a list
    """
    all_comments = Comment.query.filter(Comment.song_id == song_id).order_by(Comment.updated_at).all()

    if not all_comments:
        return {'error': 'no comment is found'}, 404

    return {'comments': [comment.to_dict() for comment in all_comments]}

#Eddie Add a comment to a song
@song_routes.route('/<int:song_id>/comments', methods=['POST'])
@login_required
def add_comments_for_song(song_id):
    """
    add a comment based on the song Id and user Id
    """
    current_song = Song.query.get(song_id)

    if current_user.id != current_song.user_id:
        return {'error': 'Not Authorized'}, 403

    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    #how do i test for this in postman??????
    if form.validate_on_submit():
        new_comment = Comment(
            comment_text=form.data['comment_text'],
            user_id=current_user.id,
            song_id=song_id
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return form.errors, 401
