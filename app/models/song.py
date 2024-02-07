from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import datetime
# from .user import User
# from .album import Album
# from .like import Like
# from .playlist import Playlist
# from .comment import Comment
from .db import db, environment, SCHEMA, add_prefix_for_prod

playlist_songs = db.Table(
    'playlist_songs',
    db.Model.metadata,
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)

)

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False, unique=True)
    genre = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    privacy = db.Column(db.Boolean(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    #one user can have many songs
    user = db.relationship('User', back_populates='songs')
    #one album can have many songs
    album = db.relationship('Album', back_populates='songs')

    #one song can have many likes
    likes = db.relationship('Like', back_populates='song')

    #many to many between songs and playlist goes here
    playlists = db.relationship('Playlist', secondary=playlist_songs, back_populates='songs')

    #one song can have many comments
    comments = db.relationship('Comment', back_populates='song')


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'description': self.description,
            'file_path': self.file_path,
            'privacy': self.privacy,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
    }
