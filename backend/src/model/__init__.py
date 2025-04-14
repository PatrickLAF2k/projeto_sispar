# Importa a classe SQLAlchemy do pacote flask_sqlalchemy.
# Essa extensão integra o SQLAlchemy com o Flask, facilitando o uso de banco de dados relacionais.
from flask_sqlalchemy import SQLAlchemy

# Cria uma instância global do SQLAlchemy.
# Essa instância será usada para configurar e manipular o banco de dados ao longo do seu projeto Flask.
db = SQLAlchemy()
