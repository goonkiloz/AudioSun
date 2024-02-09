from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Song, db, Comment, Like
from ..forms import NewSongForm, NewCommentForm

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
    """
    Create a new song
    """
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
    """
    Update song if owned by current user
    """
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
    """
    Delete song if owned by current user
    """
    song = Song.query.get(id)
    if song["user_id"] != current_user.id:
        return {'error': "Not Authorized"}

    db.session.delete(song)
    db.session.commit()
    return redirect("/")

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

@song_routes.route('/<int:song_id>/likes', methods=['GET'])
def get_likes_for_song(song_id):
    """
    Query for all likes based on song id and returns likes for that song id
    """

    current_song_likes = Like.query.filter(Like.song_id == song_id).all()

    if not current_song_likes:
        return {'error': 'no comment is found'}, 404
    return {'likes': [like.to_dict() for like in current_song_likes]}


@song_routes.route('/<int:song_id>/likes', methods=['POST'])
@login_required
def add_like_for_song(song_id):
    """
    add a like based on the song id and user id
    """
    new_like = Like(
        song_id=song_id,
        user_id=current_user.id
    )
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict() or new_like.errors, 401

@song_routes.route('/<int:song_id>/likes', methods=['DELETE'])
@login_required
def remove_like_for_song(song_id):
    """
    Remove a like based on the song id and user id
    """
    current_like = Like.query.filter(Like.song_id == song_id, Like.user_id == current_user.id).get()
    if current_like["user_id"] != current_user.id:
        return {'error': "Not Authorized"}

    if not current_like:
        return {'error': 'no like was found'}, 404
    db.session.delete(current_like)
    db.session.comment()
    return {'message': 'success'}, 200