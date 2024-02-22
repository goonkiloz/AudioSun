from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, AnyOf
from app.api.aws_helpers import ALLOWED_SONG_EXTENSIONS

extension_joined = ", ".join(ALLOWED_SONG_EXTENSIONS)

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

class NewSongForm(FlaskForm):
    title = StringField('Title',
                        validators=[
                            DataRequired(),
                            Length(max=50, message="Title cannot be longer than 50 characters")
                            ])
    song_image = FileField('Song Image', validators=[
                            FileRequired(message="Please select a image to upload"),
                            FileAllowed(["jpg", 'png', 'jpeg'])])
    genre = StringField('Genre',
                        validators=[
                            AnyOf(genres, message=" Please select a Genre"),
                            ])
    description = TextAreaField('Description', validators=[
                            DataRequired(),
                            Length(max=255, message="Description cannot be longer than 255 characters")
                            ])
    file_path = FileField('File Path', validators=[
                            FileRequired(message="Please select a song to upload"),
                            FileAllowed(list(ALLOWED_SONG_EXTENSIONS), message=f"Please choose a valid file extension. ({extension_joined})")])
    privacy = BooleanField('Private')
