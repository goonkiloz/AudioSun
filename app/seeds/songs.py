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

img = 'https://audiosunsongs.s3.amazonaws.com/2dd5bea3b6f949c6b9dfb4c8912723f1.jpg'

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
        song_image="https://images.pexels.com/photos/11066983/pexels-photo-11066983.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="1song.mp3",
        privacy=False,
        user_id=2,
        album_id=None
    ),
    dict(
        title="song 2",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/5868293/pexels-photo-5868293.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="2song.mp3",
        privacy=False,
        user_id=5,
        album_id=None
    ),
    dict(
        title="song 3",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/7211201/pexels-photo-7211201.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="3song.mp3",
        privacy=False,
        user_id=7,
        album_id=None
    ),
    dict(
        title="song 4",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/2268551/pexels-photo-2268551.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="4song.mp3",
        privacy=False,
        user_id=13,
        album_id=None
    ),
    dict(
        title="song 5",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/18376658/pexels-photo-18376658/free-photo-of-german-kabirski-jewelry.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="5song.mp3",
        privacy=False,
        user_id=14,
        album_id=None
    ),
    dict(
        title="song 6",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/5713184/pexels-photo-5713184.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="6song.mp3",
        privacy=False,
        user_id=15,
        album_id=None
    ),
    dict(
        title="song 7",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/12125041/pexels-photo-12125041.png?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="7song.mp3",
        privacy=False,
        user_id=20,
        album_id=None
    ),
    dict(
        title="song 8",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/9074951/pexels-photo-9074951.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="8song.mp3",
        privacy=False,
        user_id=23,
        album_id=None
    ),
    dict(
        title="song 9",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/6839415/pexels-photo-6839415.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="9song.mp3",
        privacy=False,
        user_id=25,
        album_id=None
    ),
    dict(
        title="song 10",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/11797898/pexels-photo-11797898.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="a1song.mp3",
        privacy=False,
        user_id=29,
        album_id=None
    ),
    dict(
        title="song 11",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/15208475/pexels-photo-15208475/free-photo-of-rocky-mountain-covered-with-snow.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="b1song.mp3",
        privacy=False,
        user_id=33,
        album_id=None
    ),
    dict(
        title="song 12",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/9618736/pexels-photo-9618736.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="c1song.mp3",
        privacy=False,
        user_id=34,
        album_id=None
    ),
    dict(
        title="song 13",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/11099095/pexels-photo-11099095.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="d1song.mp3",
        privacy=False,
        user_id=37,
        album_id=None
    ),
    dict(
        title="song 14",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/19710616/pexels-photo-19710616/free-photo-of-black-and-white-photo-of-large-plant-leaves-covered-with-dew-drops.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="e1song.mp3",
        privacy=False,
        user_id=39,
        album_id=None
    ),
    dict(
        title="song 15",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/4391611/pexels-photo-4391611.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="f1song.mp3",
        privacy=False,
        user_id=42,
        album_id=None
    ),
    dict(
        title="song 16",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/6218931/pexels-photo-6218931.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="g1song.mp3",
        privacy=False,
        user_id=44,
        album_id=None
    ),
    dict(
        title="song 17",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/3250384/pexels-photo-3250384.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="h1song.mp3",
        privacy=False,
        user_id=45,
        album_id=None
    ),
    dict(
        title="song 18",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/10559622/pexels-photo-10559622.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="i1song.mp3",
        privacy=False,
        user_id=46,
        album_id=None
    ),
    dict(
        title="song 19",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/2938046/pexels-photo-2938046.jpeg?auto=compress&cs=tinysrgb&w=800",
        description="This song is good",
        file_path="j1song.mp3",
        privacy=False,
        user_id=47,
        album_id=None
    ),
    dict(
        title="song 20",
        genre=random.choice(genres),
        song_image="https://images.pexels.com/photos/13146882/pexels-photo-13146882.jpeg?auto=compress&cs=tinysrgb&w=800",
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
            song_image=song['song_image'],
            description=song["description"],
            file_path=song["file_path"],
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
