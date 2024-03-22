from flask import jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseController:
    model = None

    @classmethod
    def get_all(cls, **kwargs):
        results = cls.model.query.filter_by(**kwargs).all()
        return jsonify([result.to_dict() for result in results])
