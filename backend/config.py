# Importa a função `environ` do módulo `os`, que permite acessar variáveis de ambiente
from os import environ

# Importa a função `load_dotenv` da biblioteca `python-dotenv`
# Essa função carrega automaticamente as variáveis definidas no arquivo `.env`
from dotenv import load_dotenv

# Carrega as variáveis do arquivo `.env` para dentro das variáveis de ambiente da aplicação
load_dotenv()

# Classe de configuração da aplicação Flask
class Config:
    # Configura a URI de conexão com o banco de dados, usando a variável de ambiente `URL_DATABASE_DEV`
    # Essa variável deve estar definida no arquivo `.env`
    SQLALCHEMY_DATABASE_URI = environ.get('URL_DATABASE_DEV')

    # Desativa o sistema de rastreamento de modificações do SQLAlchemy (melhora o desempenho e evita warning)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
