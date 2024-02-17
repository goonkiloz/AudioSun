from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length

class NewCommentForm(FlaskForm):
    comment_text = TextAreaField('Comment', validators=[DataRequired(), Length(max=255)] )
