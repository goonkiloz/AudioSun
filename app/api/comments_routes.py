from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
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

    #Check if there are any comments based on the comment Id
    if not current_comment:
        return {'error': 'no comment is found'}, 404
    #check if current comment belong to the current login user
    if current_comment.user_id != current_user.id:
        return {'error':'Not Authorized'}, 403

    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_comment.comment_text=form.data['comment_text']
        db.session.commit()
        return current_comment.to_dict()

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
    print(current_comment)

    #Check if there are any comments for the current song_id
    if not current_comment:
        return {'error': 'no comment is found'}, 404
    #check if current comment belong to the current login user
    if current_comment.user_id != current_user.id:
        return {'error':'Not Authorized'}, 403

    db.session.delete(current_comment)
    db.session.commit()

    return {'message':'succcessfully deleted'}
