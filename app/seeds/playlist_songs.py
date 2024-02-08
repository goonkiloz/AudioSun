# from app.models import db, environment, SCHEMA, playlist_songs
# from sqlalchemy.sql import text

# def seed_playlist_songs():

#     playlist_song_entries = [
#         {'playlist_id': 1, 'song_id': 2},
#         {'playlist_id': 1, 'song_id': 3},
#         {'playlist_id': 2, 'song_id': 5},
#         {'playlist_id': 3, 'song_id': 2},
#         {'playlist_id': 4, 'song_id': 2},
#         {'playlist_id': 5, 'song_id': 4},
#         {'playlist_id': 6, 'song_id': 4},
#         {'playlist_id': 7, 'song_id': 5},
#         {'playlist_id': 8, 'song_id': 1},
#         {'playlist_id': 1, 'song_id': 4},
#         {'playlist_id': 2, 'song_id': 8},
#     ]


#     for entry in playlist_song_entries:
#         # playlist_song_entry = playlist_songs.insert().values(entry)
#         # db.session.add(playlist_song_entry)


#     db.session.commit()

# def undo_playlist_songs():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM playlist_songs"))

#     db.session.commit()
