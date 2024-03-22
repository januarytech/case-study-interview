from flask import Blueprint
from controllers import CreditCardController

# Instantiate the controller
credit_card_controller = CreditCardController()

# Create a Blueprint for the credit card routes
creditcard_api = Blueprint('creditcard_api', __name__)


# Route for getting all details of credit card transactions
@creditcard_api.route('/creditcards/<int:card_holder_id>/transactions', methods=['GET'])
def get_credit_card_transactions(card_holder_id):
    return credit_card_controller.get_credit_card_transactions(card_holder_id)
