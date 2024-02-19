from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class SignUpForm(FlaskForm):
    firstName = StringField(
        "First Name",
        validators=[
            DataRequired(),
            Length(
                min=2, max=50, message="First Name should be between 2 to 50 characters"
            ),
        ],
    )
    lastName = StringField(
        "Last Name",
        validators=[
            DataRequired(),
            Length(
                min=2, max=50, message="Last Name should be between 2 to 50 characters"
            ),
        ],
    )
    username = StringField(
        "username",
        validators=[
            DataRequired(),
            username_exists,
            Length(
                min=2, max=50, message="Username should be between 2 to 50 characters"
            )
        ],
    )
    email = StringField(
        "email",
        validators=[
            DataRequired(),
            user_exists,
            Email(message="Must be a valid email"),
        ],
    )
    password = StringField("password", validators=[DataRequired()])
