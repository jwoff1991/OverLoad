from flask import Blueprint, request
from app.models import Article
from ..models.db import db
from ..forms.new_article_form import NewArticleForm
from datetime import datetime



article_routes = Blueprint('articles', __name__)
session = db.session


@article_routes.route('/all', methods=['GET'])
def article_index():
    all_articles = session.query(Article).order_by(Article.date_created)
    if not all_articles:
        return {'message': 'No stories found!'}, 404
    else:
        result = [article.to_dict() for article in all_articles]
        return result

@article_routes.route('/<int:id>', methods=['GET'])
def single_article(id):
    article = Article.query.get(id)
    if not article:
        return {'message': 'This article could nto be found'}, 404
    else:
        result = article.to_dict()
        return result

@article_routes.route('/new-article/', methods=['POST'])
def post_article():
    form = NewArticleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = request.json["user_id"]
        title = request.json["title"]
        body = request.json["body"]
        article = Article (
            user_id = user_id,
            title=title,
            body=body,
            date_created=datetime.now()
        )
        db.session.add(article)
        db.session.commit()
        return article.to_dict()
    return form.errors

@article_routes.route('/<int:id>/', methods=['DELETE'])
def delete_article(id):
    article = Article.query.get(id)
    if article:
        db.session.delete(article)
        db.session.commit()
        return {"message": "Comment deleted successfully"}
    else:
        return {"error": "Failed to delete article"}, 400

@article_routes.route('/edit/<int:id>/', methods=['PUT'])
def edit_article(id):
    form = NewArticleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        article_to_update = Article.query.get(id)
        article_to_update.title = form.data['title']
        article_to_update.body = form.data['body']
        db.session.commit()
        return article_to_update.to_dict()
    if form.errors:
        return {"errors": "an error has occured"}, 400
