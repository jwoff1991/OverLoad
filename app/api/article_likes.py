from flask import Blueprint
from app.models import ArticleLike
from ..models.db import db
from ..forms.new_article_form import NewArticleForm
from datetime import datetime



article_like_routes = Blueprint('articlelikes', __name__)
session = db.session



@article_like_routes.route('/<int:articleId>', methods=['GET'])
def get_article_likes(articleId):
    likes = ArticleLike.query.filter_by(article_id = articleId).all()
    if not likes:
        return {'message': "This article has no likes'"}
    else:
        result = [like.to_dict() for like in likes]
        return result

@article_like_routes.route('/add/<int:articleId>/<int:userId>/', methods=['POST'])
def post_article_likes(articleId, userId):
    addedLike = ArticleLike (
        article_id=articleId,
        user_id = userId,
    )
    db.session.add(addedLike)
    db.session.commit()
    return addedLike.to_dict()


@article_like_routes.route('/remove/<int:userId>/<int:articleId>/', methods=['DELETE'])
def delete_from_list(userId, articleId):
    deletedLike = ArticleLike.query.filter_by(user_id = userId, article_id = articleId).first()
    if deletedLike:
        db.session.delete(deletedLike)
        db.session.commit()
        return {"message": "Like removed successfully"}
    else:
        return {"error": "Failed to removed like"}, 400
