from flask import jsonify
from models import CreditCard
from base_controller import BaseController, db
from datetime import datetime, timedelta


class CreditCardController(BaseController):
    model = CreditCard

    def get_credit_cards_by_card_holder(self, card_holder_id):
        return self.get_all(card_holder_id=card_holder_id)


credit_card_controller = CreditCardController()
