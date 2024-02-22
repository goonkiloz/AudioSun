from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length, AnyOf

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

class EditSongForm(FlaskForm):
    title = StringField('Title', validators=[
                            DataRequired(),
                            Length(max=50, message="Title cannot be longer than 50 characters")
                            ])
    genre = StringField('Genre',
                        validators=[
                            AnyOf(genres, message=" Please select a Genre"),
                            ])
    description = StringField('Description', validators=[
                            DataRequired(),
                            Length(max=255, message="Description cannot be longer than 255 characters")
                            ])
    submit = SubmitField('Edit Song')
