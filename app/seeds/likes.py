from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_likes():

    for _ in range(50):
        new_like = Like(
            user_id=random.randrange(1,51),
            song_id=random.randrange(1,21)
        )
        db.session.add(new_like)

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
