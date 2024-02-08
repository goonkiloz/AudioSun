from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class NewCommentForm(FlaskForm):
    comment_text = TextAreaField('Comment', validators=[DataRequired()])
