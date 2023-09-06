from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follows(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    #id = db.Column(db.Integer, primary_key=True) //DO NOT BELIEVE THIS NEEDS ID BUT ASK
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    followee_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #StoryLikes has a many to one relationship with Stories and Users
    follower = db.relationship('User', back_populates='follows')
    followee = db.relationship('User', back_populates='follows')

    def to_dict(self):
        return {
            #"id": self.id,
            "follower_id": self.follower_id,
            "followee_id": self.followee_id,
        }
