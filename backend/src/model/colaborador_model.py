from src.model import db
from sqlalchemy.schema import Column
from sqlalchemy.types import String, DECIMAL, Integer


class Colaborador(db.Model):
    # Define manualmente o nome da tabela no banco de dados como 'colaborador'
    __tablename__ = "colaborador"

    # Coluna 'id' como chave primária com autoincremento
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Nome completo do colaborador
    nome = Column(String(100), nullable=False)

    # E-mail único
    email = Column(String(100), nullable=False, unique=True)

    # Senha do colaborador
    senha = Column(String(100), nullable=False)

    # Cargo/função do colaborador
    cargo = Column(String(50), nullable=False)

    # Salário (com 2 casas decimais)
    salario = Column(DECIMAL(10, 2), nullable=False)

    # Foto
    foto_url = Column(String(225), nullable=True)

    # Método construtor para facilitar a criação de objetos Colaborador
    def __init__(self, nome, email, senha, cargo, salario, foto_url=None):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.cargo = cargo
        self.salario = salario
        self.foto_url = foto_url

    def to_dict(self) -> dict:
        return {"id": self.id}

    def dados(sefl) -> dict:
        return {
            "nome": sefl.nome,
            "email": sefl.email,
            "cargo": sefl.cargo,
            "foto_url": sefl.foto_url
        }
