from flask import jsonify
from models import CardHolder, CreditCard
from base_controller import BaseController, db


class CardHolderController(BaseController):
    model = CardHolder

    def get_card_holders(self, first_name=None, last_name=None, card_number=None):
        query = CardHolder.query

        if first_name:
            query = query.filter(CardHolder.first_name.ilike(f'%{first_name}%'))
        if last_name:
            query = query.filter(CardHolder.last_name.ilike(f'%{last_name}%'))
        if card_number:
            query = query.join(CreditCard).filter(CreditCard.card_number.ilike(f'%{card_number}%'))

        card_holders = query.all()
        return jsonify([card_holder.to_dict() for card_holder in card_holders])

    def get_card_holders_by_name(self, name):
        card_holders = CardHolder.query.filter(CardHolder.name.ilike(f'%{name}%')).all()
        return jsonify([card_holder.to_dict() for card_holder in card_holders])

    def get_card_holders_by_card_issuance_date(self, issuance_date):
        card_holders = CardHolder.query.join(CreditCard).filter(CreditCard.issuance_date == issuance_date).all()
        return jsonify([card_holder.to_dict() for card_holder in card_holders])

    def get_card_holder_details(self, card_holder_id):
        card_holder = CardHolder.query.get(card_holder_id)
        if card_holder:
            return jsonify(card_holder.to_dict())
        else:
            return jsonify({"error": "Card holder not found"}), 404


card_holder_controller = CardHolderController()
