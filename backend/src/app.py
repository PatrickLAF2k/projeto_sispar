# Importa a classe Flask para criar a aplicação
from flask import Flask
from flask_cors import CORS

# Importa o blueprint do colaborador, onde ficam as rotas relacionadas
from src.controller.colaborador_controller import bp_colaborador

# Importa o objeto db (instância do SQLAlchemy)
from src.model import db

# Importa as configurações da aplicação, incluindo a URL do banco de dados
from config import Config

# Função responsável por criar e configurar a aplicação Flask
def create_app():
    # Cria uma instância da aplicação Flask
    app = Flask(__name__)
    CORS(app, origins='*')

    # Registra o blueprint do colaborador, conectando as rotas com a aplicação principal
    app.register_blueprint(bp_colaborador)

    # Carrega as configurações da classe Config (ex: conexão com o banco, variáveis .env)
    app.config.from_object(Config)
    
    # Inicializa o SQLAlchemy com a aplicação (faz o link entre Flask e banco)
    db.init_app(app)
    
    # Cria um contexto da aplicação para que o Flask tenha acesso à estrutura do app
    with app.app_context():
        # Cria as tabelas no banco de dados com base nos modelos definidos
        db.create_all()
        
    # Retorna a aplicação configurada
    return app
