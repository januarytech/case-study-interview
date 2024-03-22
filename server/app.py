from flask import Flask
from your_module import cardholder_api, creditcard_api

app = Flask(__name__)

# Register the Blueprints
app.register_blueprint(cardholder_api, url_prefix='/api')
app.register_blueprint(creditcard_api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
