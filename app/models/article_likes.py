from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod

class ArticleLikes(db.Model):
    __tablename__ = "article"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('articles.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #StoryLikes has a many to one relationship with Stories and Users
    story = db.relationship('Articles', back_populates='likes')
    liker = db.relationship('User', back_populates='article_likes')

    def to_dict(self):
        return {
            "id": self.id,
            "article_id": self.story_id,
            "user_id": self.user_id,
            "article": self.article.to_dict(),
            "liker": self.liker.to_dict()
        }
