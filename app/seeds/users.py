from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()
users = []
for i in range(50):
    users.append(
        dict(
            username=fake.user_name(),
            email=fake.email(),
            password="password",
            first_name=fake.first_name(),
            last_name=fake.last_name(),
        )
    )

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="Demo",
        last_name="User",
    )
    db.session.add(demo)

    # marnie = User(
    #     username="marnie",
    #     email="marnie@aa.io",
    #     password="password",
    #     first_name="Marnie",
    #     last_name="Mae",
    # )
    # bobbie = User(
    #     username="bobbie",
    #     email="bobbie@aa.io",
    #     password="password",
    #     first_name="Bobbi",
    #     last_name="Dong",
    # )

    for user in users:
        new_user = User(
            username=user["username"],
            email=user["email"],
            password=user["password"],
            first_name=user["first_name"],
            last_name=user["last_name"],
        )
        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
