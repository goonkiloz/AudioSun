from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# def url_check(form, self):
#     url = form.data['playlist_image']
#     if not any(char in string.punctuation for char in url):
#         raise ValidationError('not a vaild url')


class EditPlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
