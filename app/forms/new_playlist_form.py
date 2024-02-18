import string
from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, ValidationError
from app.api.aws_helpers import ALLOWED_SONG_EXTENSIONS

def url_check(form, self):
    url = form.data['playlist_image']
    if not any(char in string.punctuation for char in url):
        raise ValidationError('not a vaild url')


class NewPlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    playlist_image = URLField('playlist image', validators=[DataRequired(), url_check])
