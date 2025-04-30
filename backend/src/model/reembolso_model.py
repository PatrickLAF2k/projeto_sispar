from src.model import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DECIMAL, Date
from sqlalchemy import func


class Reembolso(db.Model):
    # Define manualmente o nome da tabela no banco de dados como 'reembolso'
    __tablename__ = "reembolso"

    id = Column(Integer, primary_key=True, autoincrement=True)
    colaborador = Column(String(100), nullable=False)
    empresa = Column(String(50), nullable=False)
    numero_prestacao = Column(Integer, nullable=False)
    descricao = Column(String(255))
    data = Column(Date, nullable=False, server_default=func.current_date())
    tipo_reembolso = Column(String(35), nullable=False)
    centro_custo = Column(String(50), nullable=False)
    ordem_interna = Column(String(50))
    divisao = Column(String(50))
    pep = Column(String(50))
    moeda = Column(String(25), nullable=False)
    # Valor para contas
    distacia_km = Column(DECIMAL(10, 2), nullable=False)
    valo_km = Column(DECIMAL(10, 2), nullable=False)
    valor_faturado = Column(DECIMAL(10, 2), nullable=False)
    despesas = Column(
        DECIMAL(10, 2)
    )  # valor faturado - o valor da despesa para o calculo
    id_colaborador = Column(
        ForeignKey(colum="colaborador.colaborador.id"), nullable=False
    )
    status = Column(String(20), nullable=False, default="Pendente")

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
        distacia_km,
        valo_km,
        valor_faturado,
        despesas,
        id_colaborador,
        status,
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
        self.distacia_km = distacia_km
        self.valo_km = valo_km
        self.valor_faturado = valor_faturado
        self.despesas = despesas
        self.id_colaborador = id_colaborador
        self.status = status
