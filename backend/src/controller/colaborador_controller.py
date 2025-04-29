from flask import Blueprint, request, jsonify
from src.model.colaborador_model import Colaborador
from src.model import db

bp_colaborador = Blueprint("colaborador", __name__, url_prefix="/colaborador")


@bp_colaborador.route("/cadastrar", methods=["POST"])
def cadastrar_novo_colaborador():
    # Pega os dados enviados no corpo da requisição em formato JSON
    dados_requisicao = request.get_json()
    # O mais proximo de uma desestruturação em Python
    nome, email, senha, cargo, salario = (
        dados_requisicao.get(key)
        for key in ["nome", "email", "senha", "cargo", "salario"]
    )

    # Verifica se todos os campos obrigatórios foram preenchidos
    if not nome or not email or not senha or not cargo or not salario:
        return jsonify({"mensagem": "Todos os campos são obrigatorios!"}), 400

    if not salario.isdigit():
        return jsonify({"mensagem": "Salário deve conter apenas números!"}), 400

    try:
        salario = float(salario)
    except ValueError:
        return jsonify({"mensagem": "Salário só deve conter números!"}), 400

    # Verifica se o colaborador já existe no banco de dados
    colaborador_existente = db.session.execute(
        db.select(Colaborador).where(Colaborador.email == email)
    ).scalar()

    if colaborador_existente:
        return jsonify({"mensagem": "Colaborador já cadastrado!"}), 409

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
    return jsonify({"mensagem": f"Colaborador {nome} cadastrado com sucesso!"}), 201


@bp_colaborador.route("/login", methods=["POST"])
def login():

    email = request.json.get("email")
    senha = request.json.get("senha")

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios!"}), 400

    colaborador = db.session.execute(
        db.select(Colaborador).where(Colaborador.email == email)
    ).scalar()

    if not colaborador:
        return jsonify({"mensagem": "Colaborador não encontrado!"}), 404

    if not colaborador.senha == senha and colaborador.email == email:
        return jsonify({"mensagem": "Email ou senha Incorretos!"}), 401

    return jsonify({"mensagem": "Login realizado com sucesso!"}), 200
