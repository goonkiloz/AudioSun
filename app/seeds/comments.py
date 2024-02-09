from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
import random

comments = [
    "This is a great song!",
    "I love this song!",
    "This song is on fire!!!!",
    "Amazing talent and amazing song!",
    "Can't stop listening to this!",
    "Very catchy and very kids friendly.",
    "So catchy!",
    "This song reminds me of my childhood!",
    "Brings back a lot of family memories!",
    "I would highly recommend this song!",
    "Where is the love?",
    "Perfect for partying",
    "Such a feel-good song!",
    "This song is so so.",
    "I can't recommend enough of the songs!",
    "Talented artist!",
    "Great song to listen on the road!",
    "Great song and great artist.",
    "Who else doesnt love this song?",
    "I am on repeat",
]


def seed_comments():
    #loop over 100 times
    for _ in range(100):
        #create a comment instance based on random info below
        new_comment = Comment(
            #random comment
            comment_text=random.choice(comments),
            #random user
            user_id=random.randrange(1, 51),
            #random 
            song_id=random.randrange(1, 21)
        )
        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
