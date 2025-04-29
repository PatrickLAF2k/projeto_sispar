from flask import Blueprint, request, jsonify
from src.model.colaborador_model import Colaborador
from src.model import db

bp_colaborador = Blueprint("colaborador", __name__, url_prefix="/colaborador")

@bp_colaborador.route("/cadastrar", methods=["POST"])
def cadastrar_novo_colaborador():
    # Pega os dados enviados no corpo da requisição em formato JSON
    dados_requisicao = request.get_json()

    # Verifica se os campos obrigatórios 'nome' e 'cargo' estão vazios
    if dados_requisicao["nome"] == "" or dados_requisicao["cargo"] == "":
        # Retorna uma mensagem de erro e o status HTTP 400 (Bad Request)
        return jsonify({"mensagem": "Todos os campos são obrigatorios!"}), 400

    # Cria uma nova instância de Colaborador com os dados recebidos
    novo_colaborador = Colaborador(
        nome=dados_requisicao["nome"],
        email=dados_requisicao["email"],
        senha=dados_requisicao["senha"],
        cargo=dados_requisicao["cargo"],
        salario=dados_requisicao["salario"],
    )

    # Adiciona o novo colaborador à sessão do banco de dados
    db.session.add(novo_colaborador)

    # Salva (commit) as mudanças no banco de dados
    db.session.commit()

    # Retorna uma mensagem de sucesso e o status HTTP 201 (Created)
    return jsonify({"mensagem": "Colaborador cadastrado com sucesso!"}), 201


@bp_colaborador.route("/login", methods=["POST"])
def login():

    email = request.json.get("email")
    senha = request.json.get("senha")

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios!"}), 400

    colaborador = db.session.execute(
        db.select(Colaborador).where(Colaborador.email == email)
    ).scalar()
    print(colaborador)

    if not colaborador:
        return jsonify({"mensagem": "Colaborador não encontrado!"}), 404

    if not colaborador.senha == senha and colaborador.email == email:
        return jsonify({"mensagem": "Email ou senha Incorretos!"}), 401

    return jsonify({"mensagem": "Login realizado com sucesso!"}), 200
