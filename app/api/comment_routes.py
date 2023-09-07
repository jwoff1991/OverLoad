from flask import Blueprint, request
from app.models import User, Comment
from ..models.db import db
from ..forms.new_comment import CommentForm
from datetime import datetime


comment_routes = Blueprint('comments', __name__)
session = db.session


@comment_routes.route('/<int:id>/all', methods=['GET'])
def comments_index(id):
    article_comments = Comment.query.filter_by(article_id = id).order_by(Comment.date_created)
    if not article_comments:
        message = 'There are currently no comments'
        return message
    else:
        result = [comment.to_dict() for comment in article_comments]
        return result


@comment_routes.route('/new-comment/', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = request.json["user_id"]
        article_id = request.json["article_id"]
        body = request.json["body"]
        comment = Comment(
            user_id = user_id,
            article_id= article_id,
            body=body,
            date_created=datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    print('errors', form.errors)
    return form.errors


@comment_routes.route('/<int:id>/', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "Comment deleted successfully"}
    else:
        return {"error": "Failed to delete comment"}, 400
