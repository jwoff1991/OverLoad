from flask import Blueprint, request, jsonify
from ..models.db import db
from app.models import ReadingList


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
