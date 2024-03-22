from flask import Blueprint, request
from controllers import CardHolderController

# Instantiate the controller
card_holder_controller = CardHolderController()

# Create a Blueprint for the cardholder routes
cardholder_api = Blueprint('cardholder_api', __name__)


# Route for searching cardholders
@cardholder_api.route('/cardholders/search', methods=['GET'])
def search_cardholders():
    search_params = request.args
    return card_holder_controller.get_card_holders(search_params)


@cardholder_api.route('/cardholders/<int:card_holder_id>/details', methods=['GET'])
def get_cardholder_detail(card_holder_id):
    return card_holder_controller.get_card_holder_details(card_holder_id)
