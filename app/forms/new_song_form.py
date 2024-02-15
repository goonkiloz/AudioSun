from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS



class NewSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    file_path = FileField('File Path', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    privacy = BooleanField('Private')
    submit = SubmitField('Upload Song')
