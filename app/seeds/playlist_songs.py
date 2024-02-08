from app.models import db, environment, SCHEMA, Playlist, Song
from sqlalchemy.sql import text
import random

def seed_playlist_songs():
    #grab all the playlist in the seeder, 10
    playlists = Playlist.query.all()
    #grab all the songs in the seeder 20
    songs = Song.query.all()

    for playlist in playlists: #loop over the each playlist
        #get random nums of songs
        random_songs_number = random.randrange(1, 21)
        #get a list of random songs based on the random songs num and all the songs
        random_selected_songs = random.sample(songs, random_songs_number)
        #assign list of random songs to the current playlist
        playlist.songs.extend(random_selected_songs)

    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
