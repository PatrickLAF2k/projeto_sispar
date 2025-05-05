from flask import Flask, session
from flask_cors import CORS
from dotenv import load_dotenv
from src.controller.colaborador_controller import bp_colaborador
from src.controller.reembolso_controller import bp_reembolso
from src.model import db
from config import Config
from flasgger import Swagger

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
    # Carrega as variáveis de ambiente do arquivo .env
    load_dotenv()

    # Cria uma instância do Flask
    app = Flask(__name__)

    # Configura o CORS para permitir requisições de qualquer origem
    CORS(app, origins="*")

    # Define a chave secreta a partir da variável de ambiente
    app.secret_key = os.getenv("SECRET_KEY")

    # Registra os blueprints
    app.register_blueprint(bp_colaborador)
    app.register_blueprint(bp_reembolso)

    # Carrega as configurações
    app.config.from_object(Config)

    # Carrega as configurações
    db.init_app(app)

    Swagger(app, config=Swagger_config)

    # Cria as tabelas no banco
    with app.app_context():
        db.create_all()

    return app
