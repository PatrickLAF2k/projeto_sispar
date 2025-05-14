from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from src.controller.colaborador.colaborador_controller import bp_colaborador
from src.controller.reembolso.reembolso_controller import bp_reembolso
from src.model import db
from config import Config
from flasgger import Swagger
import cloudinary
import os

Swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json/",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "Swagger_ui": True,
    "specs_route": "/apidocs/",
}


def create_app():
    load_dotenv()

    app = Flask(__name__)

    CORS(app, origins="*")

    app.secret_key = os.getenv("SECRET_KEY")

    cloudinary.config(cloudinary_url=os.getenv("CLOUDINARY_URL"))

    app.register_blueprint(bp_colaborador)
    app.register_blueprint(bp_reembolso)

    app.config.from_object(Config)

    db.init_app(app)

    Swagger(app, config=Swagger_config)

    with app.app_context():
        db.create_all()

    return app
