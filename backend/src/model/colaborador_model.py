from src.model import db
from sqlalchemy.schema import Column
from sqlalchemy.types import String, DECIMAL, Integer


class Colaborador(db.Model):
    __tablename__ = "colaborador"

    id = Column(Integer, primary_key=True, autoincrement=True)

    nome = Column(String(100), nullable=False)

    email = Column(String(100), nullable=False, unique=True)

    senha = Column(String(100), nullable=False)

    cargo = Column(String(50), nullable=False)

    salario = Column(DECIMAL(10, 2), nullable=False)

    foto_url = Column(String(225), nullable=True)

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
