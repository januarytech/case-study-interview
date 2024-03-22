# app.py
from flask import Flask
from models import db
from controllers import card_holder_controller, credit_card_controller

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

app.register_blueprint(card_holder_controller)
app.register_blueprint(credit_card_controller)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
