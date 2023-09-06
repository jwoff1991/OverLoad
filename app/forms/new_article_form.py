from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class NewArticleForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])
