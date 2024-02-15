from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint("likes", __name__)

@like_routes.route('/<int:like_id>', methods=["DELETE"])
@login_required
def remove_like_for_song(like_id):
    """
    Remove a like based on the song id and user id
    """
    print('is deletion called')
    current_like = Like.query.get(like_id)

    if current_like.user_id != current_user.id:
        return {'error': "Not Authorized"}

    if not current_like:
        return {'error': 'no like was found'}, 404

    db.session.delete(current_like)
    db.session.commit()
    return {'message': 'success'}, 200
