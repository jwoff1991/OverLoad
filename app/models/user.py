from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    bio = db.Column(db.Text)
    #ADD IN type_of_article_preference
    hashed_password = db.Column(db.Text, nullable=False)

     # Users has one => many relationships with Articles, Reading List, Comments, Likes
    articles = db.relationship('Article', back_populates='author', cascade='all, delete-orphan')
    article_comments = db.relationship('Comment', back_populates='commenter', cascade='all, delete-orphan')
    article_likes = db.relationship('ArticleLike', back_populates='liker', cascade='all, delete-orphan')
    # follower = db.relationship("Follow", back_populates="follower", cascade='all, delete-orphan')
    # followee = db.relationship("Follow", back_populates="followee", cascade='all, delete-orphan')

    ##ASK ABOUT FOLLOWER/FOLLOWEE relationships


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.first_name,
            'lastname': self.last_name,
            'username': self.username,
            'email': self.email
        }
