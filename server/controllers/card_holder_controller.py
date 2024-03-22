from flask import jsonify
from models import CardHolder, CreditCard
from base_controller import BaseController, db


class CardHolderController(BaseController):
    model = CardHolder

    def get_card_holders(self, search_params):
        return self.get_all(**search_params)


card_holder_controller = CardHolderController()
