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

songs = [
    dict(
        title="song 1",
        genre="Rock",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/0684b8c1ff8948e5a49adae815d0aa40.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/0330c1627a2c4bb394b2a064776a18c3.mp3",
        privacy=False,
        user_id=2,
        album_id=None
    ),
    dict(
        title="song 2",
        genre="Rock",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/eb2cd1f2062841a69ae2de55ee161c72.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/33b02905f26c4682bbf35112e0b2b1df.mp3",
        privacy=False,
        user_id=5,
        album_id=None
    ),
    dict(
        title="song 3",
        genre="Hip Hop",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/135fe6d6b0824f97a64c63fd1c75e5f0.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/62beb6dc6a104bfc879a3f2e18e97704.mp3",
        privacy=False,
        user_id=7,
        album_id=None
    ),
    dict(
        title="song 4",
        genre="Hip Hop",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/17586c257707440b8a1e1a9a8fcce7ad.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/6683c7ebb0454266baaf3ebc7b208416.mp3",
        privacy=False,
        user_id=13,
        album_id=None
    ),
    dict(
        title="song 5",
        genre="Country",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/3ded1a68fa414af19630557364cd8363.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/69e443c2879c458580469d3d89275249.mp3",
        privacy=False,
        user_id=14,
        album_id=None
    ),
    dict(
        title="song 6",
        genre="Country",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/453b3404e316400f9d8b9bb37fc212b1.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/75ade037f4a044a7b8be976f54663940.mp3",
        privacy=False,
        user_id=15,
        album_id=None
    ),
    dict(
        title="song 7",
        genre="Pop",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/493ccd63299545a9b8edd0f8a5ef01e0.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/77d781edb3c741a8878ab33d22121b9e.mp3",
        privacy=False,
        user_id=20,
        album_id=None
    ),
    dict(
        title="song 8",
        genre="Pop",
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/5353e6b9d781415eb0514d3982db17bf.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/88678d2b08f4460696bd37b83f3fe0a7.mp3",
        privacy=False,
        user_id=23,
        album_id=None
    ),
    dict(
        title="song 9",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/556cd20507b74736973ccfed737a6741.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/89f30499fef84d068a6d9940671c2f4d.mp3",
        privacy=False,
        user_id=25,
        album_id=None
    ),
    dict(
        title="song 10",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/5d5683cae453408eb7e121d0b3f41798.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/96ba59f0c958426fa5153706718dc12d.mp3",
        privacy=False,
        user_id=29,
        album_id=None
    ),
    dict(
        title="song 11",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/60b00f85b1934499a5c54c30fb373434.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/a37eb1bc7ffe41909af14e2273d5300e.mp3",
        privacy=False,
        user_id=33,
        album_id=None
    ),
    dict(
        title="song 12",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/6b59c5c6dbfb409fa504259aca556250.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/a9bfba2cd21c4d149f2e73f8d2405b8a.mp3",
        privacy=False,
        user_id=34,
        album_id=None
    ),
    dict(
        title="song 13",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/7dd6a04c06ce43338347a24951587629.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/f82ea478f8334c5cb5804cddce9382f6.mp3",
        privacy=False,
        user_id=37,
        album_id=None
    ),
    dict(
        title="song 14",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/af5f762739a0409786ed10d87d91029d.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/c7da91e0328d4342b8d47a55365d358f.mp3",
        privacy=False,
        user_id=39,
        album_id=None
    ),
    dict(
        title="song 15",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/b2fa4edaedc84ae98d93f635d85fa93a.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/cf2da0df35e7402293904d0c6853fc43.mp3",
        privacy=False,
        user_id=42,
        album_id=None
    ),
    dict(
        title="song 16",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/b371a4689512412f91b53223f147d773.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/d2aa8ee035ff4dcc88359ab95526d1d5.mp3",
        privacy=False,
        user_id=44,
        album_id=None
    ),
    dict(
        title="song 17",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/c909693b2f9e4237b92b8b359b850375.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/d831540b5cf043daaaab39b4662bca50.mp3",
        privacy=False,
        user_id=45,
        album_id=None
    ),
    dict(
        title="song 18",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/c92a1b98117b49e0bebbae8124ad8840.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/e5e714aacb4848dd98bb037479fa8f06.mp3",
        privacy=False,
        user_id=46,
        album_id=None
    ),
    dict(
        title="song 19",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/caf4d23cab284429a401e042cbf85ae3.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/ea63e39d0b904c45ad9e20665059180e.mp3",
        privacy=False,
        user_id=47,
        album_id=None
    ),
    dict(
        title="song 20",
        genre=random.choice(genres),
        song_image="https://audiosunsongs.s3.amazonaws.com/seedsongs/d21d22b0761849c9843fea73f2d04f14.png",
        description="This song is good",
        file_path="https://audiosunsongs.s3.amazonaws.com/seedsongs/ee00e679d97d48cfaa5690703f3c5ede.mp3",
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
            song_image=song["song_image"],
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
