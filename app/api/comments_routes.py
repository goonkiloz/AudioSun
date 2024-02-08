from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from app.models import Song, User, db, Comment
from ..forms import NewCommentForm

comments_routes = Blueprint('comments', __name__)


#Eddie
@comments_routes.route('/<int:comment_id>', methods=['PUT', 'PATCH'])
@login_required
def update_comment(comment_id):
    """
    revise a comment to a song based on comment Id
    only when the comment belongs to current user
    """
    current_comment = Comment.query.get(comment_id)

    #check if current comment belong to the current login user
    if current_comment.user_id != current_user.id:
        return {'error':'Not Authorized'}, 403

    #Check if there are any comments based on the comment Id
    if not current_comment:
        return {'error': 'no comment is found'}, 404

    #how do i test for this in postman??????
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_comment.comment_text=form.data['comment_text']
        db.session.commit()

    return form.errors, 401

#Eddie delete a comment from a song
@comments_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    delete a comment to a song based on comment Id
    only when the comment belongs to current user
    """
    current_comment = Comment.query.get(comment_id)
    # print(current_user.id)

    #check if current comment belong to the current login user
    if current_comment.user_id != current_user.id:
        return {'error':'Not Authorized'}, 403

    #Check if there are any comments for the current song_id
    if not current_comment:
        return {'error': 'no comment is found'}, 404

    db.session.delete(current_comment)
    db.session.commit()

    return {'message':'succcessfully deleted'}


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
