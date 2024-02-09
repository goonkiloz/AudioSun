from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Like

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/likes')
@login_required
def get_user_likes(id):
    """
    Query for all user likes and returns a dictionary of the current users likes
    """

    current_user_likes = Like.query.filter(Like.user_id == id).all()

    if not current_user_likes:
        return {'error': 'no likes were found'}, 404
    return current_user_likes.to_dict()
