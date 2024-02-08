from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

playlists = [
    dict(
        title="playlist 1",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=1
    ),
    dict(
        title="playlist 2",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=2
    ),
    dict(
        title="playlist 3",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=3
    ),
    dict(
        title="playlist 4",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=4
    ),
    dict(
        title="playlist 5",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=5
    ),
    dict(
        title="playlist 6",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=6
    ),
    dict(
        title="playlist 7",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=7
    ),
    dict(
        title="playlist 8",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=8
    ),
    dict(
        title="playlist 9",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=9
    ),
    dict(
        title="playlist 10",
        description="a pretty good playlist",
        playlist_image="image.url",
        user_id=10
    ),
]

def seed_playlists():
    for playlist in playlists:
        new_playlist = Playlist(
            title=playlist["title"],
            description=playlist["description"],
            playlist_image=playlist["playlist_image"],
            user_id=playlist["user_id"],
        )
        db.session.add(new_playlist)

    db.session.commit()


def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
