from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import datetime
# from .user import User
# from .song import Song
# from .playlist import Playlist
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=True)

    user = db.relationship('User', back_populates='likes')
    song = db.relationship('Song', back_populates='likes')
    playlist = db.relationship('Playlist', back_populates='likes')
