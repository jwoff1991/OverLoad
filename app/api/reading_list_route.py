from flask import Blueprint, request, jsonify
from ..models.db import db
from app.models import ReadingList
from datetime import datetime


reading_list_routes = Blueprint('reading_list', __name__)
session = db.session

# prefix /api/reading-list
@reading_list_routes.route('/<int:userId>/', methods=['GET'])
def get_reading_list(userId):
    reading_list = ReadingList.query.filter_by(user_id = userId).all()
    if not reading_list:
        message = 'There are currently articles on this readinglist'
        return message
    else:
        result = [list.to_dict() for list in reading_list]
        return result


@reading_list_routes.route('/add/<int:articleId>/<int:userId>/', methods=['POST'])
def add_article_to_list(userId, articleId):
    addedArticle = ReadingList (
        article_id=articleId,
        user_id = userId,
    )
    db.session.add(addedArticle)
    db.session.commit()
    return addedArticle.to_dict()




@reading_list_routes.route('/remove/<int:userId>/<int:articleId>/', methods=['DELETE'])
def delete_from_list(userId, articleId):
    article = ReadingList.query.filter_by(user_id = userId, article_id = articleId).first()
    if article:
        db.session.delete(article)
        db.session.commit()
        return {"message": "Article removed successfully"}
    else:
        return {"error": "Failed to removed article"}, 400
