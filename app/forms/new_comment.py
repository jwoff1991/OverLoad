from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    article_id = IntegerField("Article_Id", validators=[DataRequired()])
    user_id = IntegerField("Article_Id", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])
