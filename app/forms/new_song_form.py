from flask_wtf import FlaskForm
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired

class NewSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    file_path = URLField('File Path', validators=[DataRequired()])
    privacy = BooleanField('Private')
