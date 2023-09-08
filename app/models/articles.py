from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Article(db.Model):
    __tablename__ = "articles"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.Text, nullable=False)
    # MAKE SURE TO ADD IN ARTICLE TYPE LATER
    date_created = db.Column(db.DateTime, nullable=False)


    # Articles has one => many relationships with Users, ArticleComments, ArticleLikes
    author = db.relationship('User', back_populates='articles')
    comments = db.relationship('Comment', back_populates='article', cascade='all, delete-orphan')
    reading_list = db.relationship('ReadingList', back_populates='article', cascade='all, delete-orphan')
    # likes = db.relationship('ArticleLike', back_populates='article', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "body": self.body,
            "date_created": self.date_created,
            "author": self.author.to_dict()
        }
