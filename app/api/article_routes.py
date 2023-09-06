from flask import Blueprint, request
from app.models import User, Article
from ..models.db import db
from flask_login import current_user, login_required
from datetime import datetime


article_routes = Blueprint('articles', __name__)
session = db.session


@article_routes.route('/all', methods=['GET'])
def article_index():
    all_articles = session.query(Article) #.order_by(Article.date_created)
    print(all_articles)
    if not all_articles:
        error = {}
        error.message = "No stories found!"
        return error.message
    else:
        result = [article.to_dict() for article in all_articles]
        return result
