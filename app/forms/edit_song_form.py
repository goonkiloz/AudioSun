from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired



class EditSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    privacy = BooleanField('Private')
    submit = SubmitField('Edit Song')
