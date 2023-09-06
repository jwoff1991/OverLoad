from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ArticleComment(db.Model):
    __tablename__ = "article_comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('articles.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)

    # Story Comments has a Many to one relationship with Stories and Users
    article = db.relationship('Article', back_populates='comments')
    commenter = db.relationship('User', back_populates='article_comments')

    def to_dict(self):
        return {
            "id": self.id,
            "article_id": self.article_id,
            "user_id": self.user_id,
            "body": self.body,
            "date_created": self.date_created,
            "article": self.article.to_dict(),
            "commenter": self.commenter.to_dict()
        }
