from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod

class ReadingList(db.Model):
    __tablename__ = "reading_lists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True) #DO NOT BELIEVE THIS NEEDS ID BUT ASK
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('articles.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #StoryLikes has a many to one relationship with Stories and Users
    article = db.relationship('Article', back_populates='article')
    reader = db.relationship('User', back_populates='reading_lists')

    def to_dict(self):
        return {
            #"id": self.id,
            "article_id": self.story_id,
            "user_id": self.user_id,
            "article": self.article.to_dict(),
            "reader": self.liker.to_dict()
        }
