from flask import jsonify
from models import CreditCard
from base_controller import BaseController, db
from datetime import datetime, timedelta


class CreditCardController(BaseController):
    model = CreditCard

    def get_credit_cards_by_card_holder(self, card_holder_id):
        return self.get_all(card_holder_id=card_holder_id)

    def get_credit_card_by_number(self, card_number):
        credit_card = CreditCard.query.filter_by(card_number=card_number).first()
        return jsonify(credit_card.to_dict() if credit_card else {})

    def get_credit_card_balance(self, card_number):
        credit_card = CreditCard.query.filter_by(card_number=card_number).first()
        if credit_card:
            # Sum up the amounts of all transactions related to the credit card
            total_balance = sum(transaction.amount for transaction in credit_card.transactions)
            return jsonify({'balance': total_balance})
        else:
            return jsonify({'error': 'Credit card not found'})

    def calculate_next_payment_date(self, card_number):
        credit_card = CreditCard.query.filter_by(card_number=card_number).first()
        if credit_card:
            # Assuming next payment date is 30 days after the last payment date
            next_payment_date = credit_card.next_payment_date + timedelta(days=30)
            return jsonify({'next_payment_date': next_payment_date.strftime('%Y-%m-%d')})
        else:
            return jsonify({'error': 'Credit card not found'})

    def get_credit_card_transactions(self, card_number):
        credit_card = CreditCard.query.filter_by(card_number=card_number).first()
        if credit_card:
            transactions = credit_card.transactions
            return jsonify([transaction.to_dict() for transaction in transactions])
        else:
            return jsonify({'error': 'Credit card not found'})


credit_card_controller = CreditCardController()
