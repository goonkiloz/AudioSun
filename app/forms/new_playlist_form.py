from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_SONG_EXTENSIONS

class NewPlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    playlist_image = URLField('playlist image', validators=[DataRequired()])
