from src.model import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, DECIMAL, String, Date
from sqlalchemy import func


class Reembolso(db.Model):
    # Define manualmente o nome da tabela no banco de dados como 'reembolso'
    __tablename__ = "reembolso"

    id = Column(Integer, primary_key=True, autoincrement=True)
    colaborador = Column(String(100), nullable=False)
    empresa = Column(String(50), nullable=False)
    numero_prestacao = Column(Integer, nullable=False)
    descricao = Column(String(255))
    data = Column(Date, nullable=False)
    tipo_reembolso = Column(String(35), nullable=False)
    centro_custo = Column(String(50), nullable=False)
    ordem_interna = Column(String(50))
    divisao = Column(String(50))
    pep = Column(String(50))
    moeda = Column(String(25), nullable=False)
    distancia_km = Column(DECIMAL(10, 2))
    valor_km = Column(DECIMAL(10, 2))
    valor_faturado = Column(DECIMAL(10, 2), nullable=False)
    despesas = Column(DECIMAL(10, 2))
    id_colaborador = Column(Integer, ForeignKey("colaborador.id"), nullable=False)
    status = Column(String(20), nullable=False)

    # Método construtor para facilitar a criação de objetos Colaborador
    def __init__(
        self,
        colaborador,
        empresa,
        numero_prestacao,
        descricao,
        data,
        tipo_reembolso,
        centro_custo,
        ordem_interna,
        divisao,
        pep,
        moeda,
        distancia_km,
        valor_km,
        valor_faturado,
        despesas,
        id_colaborador,
        status = "Em análise",
    ):
        self.colaborador = colaborador
        self.empresa = empresa
        self.numero_prestacao = numero_prestacao
        self.descricao = descricao
        self.data = data
        self.tipo_reembolso = tipo_reembolso
        self.centro_custo = centro_custo
        self.ordem_interna = ordem_interna
        self.divisao = divisao
        self.pep = pep
        self.moeda = moeda
        self.distancia_km = distancia_km
        self.valo_km = valor_km
        self.valor_faturado = valor_faturado
        self.despesas = despesas
        self.id_colaborador = id_colaborador
        self.status = status

    def to_dict(self) -> dict:
        return {
            "colaborador": self.colaborador,
            "empresa": self.empresa,
            "numero_prestacao": self.numero_prestacao,
            "descricao": self.descricao,
            "data": self.data,
            "tipo_reembolso": self.tipo_reembolso,
            "centro_custo": self.centro_custo,
            "ordem_interna": self.ordem_interna,
            "divisao": self.divisao,
            "pep": self.pep,
            "moeda": self.moeda,
            "distancia_km": self.distancia_km,
            "valor_km": self.valor_km,
            "valor_faturado": self.valor_faturado,
            "despesas": self.despesas,
            "id_colaborador": self.id_colaborador,
            "status": self.status
        }

