from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired

class NewPlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    playlist_image = URLField('Playlist Image', validators=[DataRequired()])
