from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_SONG_EXTENSIONS



class NewSongForm(FlaskForm):
    title = StringField('Title',
                        validators=[
                            DataRequired(),
                            Length(max=50, message="Title cannot be longer than 50 characters")
                            ])
    song_image = FileField('Song Image', validators=[
                            FileRequired(message="Please select a image to upload"),
                            FileAllowed(["jpg", 'png'])])
    genre = StringField('Genre',
                        validators=[
                            DataRequired(),
                            Length(max=50, message="Genre cannot be longer than 50 characters")
                            ])
    description = TextAreaField('Description', validators=[
                            DataRequired(),
                            Length(max=255, message="Description cannot be longer than 255 characters")
                            ])
    file_path = FileField('File Path', validators=[
                            FileRequired(message="Please select a song to upload"),
                            FileAllowed(list(ALLOWED_SONG_EXTENSIONS))])
