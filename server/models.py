from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class CardHolder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    social_security_number = db.Column(db.String(11), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    credit_score = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    credit_cards = db.relationship('CreditCard', backref='card_holder', lazy=True)


class CreditCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_number = db.Column(db.String(16), nullable=False)
    issuance_date = db.Column(db.Date, nullable=False)
    current_balance = db.Column(db.Float, nullable=False)
    next_payment_date = db.Column(db.Date, nullable=False)
    overdue_balance = db.Column(db.Float, nullable=False)
    overdue_balance_payment_date = db.Column(db.Date, nullable=False)
    days_overdue = db.Column(db.Integer, nullable=False)
    card_holder_id = db.Column(db.Integer, db.ForeignKey('card_holder.id'), nullable=False)


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    credit_card_id = db.Column(db.Integer, db.ForeignKey('credit_card.id'), nullable=False)
    transaction_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    credit_card = db.relationship('CreditCard', backref=db.backref('transactions', lazy=True))
