from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Country",
    "Jazz",
    "Electronic",
    "Classical",
    "Reggae",
    "Folk",
    "Blues",
    "Metal",
    "Indie",
    "Punk",
    "Alternative",
    "Funk",
    "Soul",
    "Gospel",
    "Disco",
    "Techno"
]

# songs = [
#     "https://audiosunsongs.s3.amazonaws.com/0567664f9a0642ff987da246077cc6b9.mp3",
#     "https://audiosunsongs.s3.amazonaws.com/8ec282c1aad54eb3a2283650509022e9.mp3",
#     "https://audiosunsongs.s3.amazonaws.com/cef7cd263b714657b9360cf5037d84bc.mp3",
#     "https://audiosunsongs.s3.amazonaws.com/9363ea9e16d04aad987f481361955430.mp3",
#     "https://audiosunsongs.s3.amazonaws.com/d647f96808ab448da91c545d4c560e51.mp3",
#     "https://audiosunsongs.s3.amazonaws.com/be66142415f4479bb5ffdc3d423f7713.mp3",
# ]

songs = [
    dict(
        title="song 1",
        genre=random.choice(genres),
        description="This song is good",
        file_path="1song.mp3",
        privacy=False,
        user_id=1,
        album_id=None
    ),
    dict(
        title="song 2",
        genre=random.choice(genres),
        description="This song is good",
        file_path="2song.mp3",
        privacy=False,
        user_id=5,
        album_id=None
    ),
    dict(
        title="song 3",
        genre=random.choice(genres),
        description="This song is good",
        file_path="3song.mp3",
        privacy=False,
        user_id=7,
        album_id=None
    ),
    dict(
        title="song 4",
        genre=random.choice(genres),
        description="This song is good",
        file_path="4song.mp3",
        privacy=False,
        user_id=13,
        album_id=None
    ),
    dict(
        title="song 5",
        genre=random.choice(genres),
        description="This song is good",
        file_path="5song.mp3",
        privacy=False,
        user_id=14,
        album_id=None
    ),
    dict(
        title="song 6",
        genre=random.choice(genres),
        description="This song is good",
        file_path="6song.mp3",
        privacy=False,
        user_id=15,
        album_id=None
    ),
    dict(
        title="song 7",
        genre=random.choice(genres),
        description="This song is good",
        file_path="7song.mp3",
        privacy=False,
        user_id=20,
        album_id=None
    ),
    dict(
        title="song 8",
        genre=random.choice(genres),
        description="This song is good",
        file_path="8song.mp3",
        privacy=False,
        user_id=23,
        album_id=None
    ),
    dict(
        title="song 9",
        genre=random.choice(genres),
        description="This song is good",
        file_path="9song.mp3",
        privacy=False,
        user_id=25,
        album_id=None
    ),
    dict(
        title="song 10",
        genre=random.choice(genres),
        description="This song is good",
        file_path="a1song.mp3",
        privacy=False,
        user_id=29,
        album_id=None
    ),
    dict(
        title="song 11",
        genre=random.choice(genres),
        description="This song is good",
        file_path="b1song.mp3",
        privacy=False,
        user_id=33,
        album_id=None
    ),
    dict(
        title="song 12",
        genre=random.choice(genres),
        description="This song is good",
        file_path="c1song.mp3",
        privacy=False,
        user_id=34,
        album_id=None
    ),
    dict(
        title="song 13",
        genre=random.choice(genres),
        description="This song is good",
        file_path="d1song.mp3",
        privacy=False,
        user_id=37,
        album_id=None
    ),
    dict(
        title="song 14",
        genre=random.choice(genres),
        description="This song is good",
        file_path="e1song.mp3",
        privacy=False,
        user_id=39,
        album_id=None
    ),
    dict(
        title="song 15",
        genre=random.choice(genres),
        description="This song is good",
        file_path="f1song.mp3",
        privacy=False,
        user_id=42,
        album_id=None
    ),
    dict(
        title="song 16",
        genre=random.choice(genres),
        description="This song is good",
        file_path="g1song.mp3",
        privacy=False,
        user_id=44,
        album_id=None
    ),
    dict(
        title="song 17",
        genre=random.choice(genres),
        description="This song is good",
        file_path="h1song.mp3",
        privacy=False,
        user_id=45,
        album_id=None
    ),
    dict(
        title="song 18",
        genre=random.choice(genres),
        description="This song is good",
        file_path="i1song.mp3",
        privacy=False,
        user_id=46,
        album_id=None
    ),
    dict(
        title="song 19",
        genre=random.choice(genres),
        description="This song is good",
        file_path="j1song.mp3",
        privacy=False,
        user_id=47,
        album_id=None
    ),
    dict(
        title="song 20",
        genre=random.choice(genres),
        description="This song is good",
        file_path="k1song.mp3",
        privacy=False,
        user_id=50,
        album_id=None
    ),
]

def seed_songs():
    for song in songs:
        new_song = Song(
            title=song["title"],
            genre=song["genre"],
            description=song["description"],
            file_path=song["file_path"],
            privacy=song["privacy"],
            user_id=song["user_id"],
            album_id=song["album_id"]
        )
        db.session.add(new_song)

    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
