from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length



class EditSongForm(FlaskForm):
    title = StringField('Title', validators=[
                            DataRequired(),
                            Length(max=50, message="Title cannot be longer than 50 characters")
                            ])
    genre = StringField('Genre', validators=[
                            DataRequired(),
                            Length(max=50, message="Genre cannot be longer than 50 characters")
                            ])
    description = StringField('Description', validators=[
                            DataRequired(),
                            Length(max=255, message="Description cannot be longer than 255 characters")
                            ])
    submit = SubmitField('Edit Song')
