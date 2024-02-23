from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length


# def url_check(form, self):
#     url = form.data['playlist_image']
#     if not any(char in string.punctuation for char in url):
#         raise ValidationError('not a vaild url')


class EditPlaylistForm(FlaskForm):
    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(" "):
            raise ValidationError("Content should not start with whitespace.")
        if field.data and field.data.endswith(" "):
            raise ValidationError("Content should not end with whitespace.")

    title = StringField(
        "Title",
        validators=[
            DataRequired(),
            Length(max=50, message="Title cannot be longer than 50 characters"),
            no_white_space,
        ],
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired(),
            no_white_space,
            Length(max=255, message="Description cannot be longer than 255 characters"),
        ],
    )
