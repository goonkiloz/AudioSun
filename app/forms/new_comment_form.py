from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError


class NewCommentForm(FlaskForm):
    def no_white_space(FlaskForm, field):
        if field.data and field.data.startswith(' '):
            raise ValidationError('Comment should not start with whitespace.')
        if field.data and field.data.endswith(' '):
            raise ValidationError('Comment should not end with whitespace.')


    comment_text = TextAreaField('Comment', validators=[DataRequired(), Length(max=255), no_white_space])
