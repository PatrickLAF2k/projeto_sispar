from flask import Blueprint, request, jsonify
from src.model.colaborador_model import Colaborador
from src.model import db
from flasgger import swag_from
from src.security.security import hash_senha, verificar_senha

bp_colaborador = Blueprint("colaborador", __name__, url_prefix="/colaborador")


@bp_colaborador.route("/cadastrar", methods=["POST"])
@swag_from("../docs/colaborador/cadastrar_colaborador.yml")
def cadastrar_novo_colaborador():
    nome = request.json.get("nome")
    email = request.json.get("email")
    senha = request.json.get("senha")
    cargo = request.json.get("cargo")
    salario = request.json.get("salario")
    

    try:

        if not nome or not email or not senha or not cargo or not salario:
            return jsonify({"mensagem": "Todos os campos são obrigatorios!"}), 400


        colaborador_existente = db.session.execute(
            db.select(Colaborador).where(Colaborador.email == email)
        ).scalar()

        if colaborador_existente:
            return jsonify({"mensagem": "Email já cadastrado!"}), 409

        novo_colaborador = Colaborador(
            nome=nome,
            email=email,
            senha=hash_senha(senha),
            cargo=cargo,
            salario=salario,
        )

        # Adiciona o novo colaborador à sessão do banco de dados
        db.session.add(novo_colaborador)

        # Salva (commit) as mudanças no banco de dados
        db.session.commit()

        # Retorna uma mensagem de sucesso e o status HTTP 201 (Created)
        return jsonify({"mensagem": f"Colaborador {nome} cadastrado com sucesso!"}), 201

    except Exception as e:
        # Captura qualquer exceção e retorna um erro genérico com a mensagem
        return jsonify({"erro": f"Ocorreu um erro inesperado: {str(e)}"}), 500


@bp_colaborador.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    senha = request.json.get("senha")

    try:

        if not email or not senha:
            return jsonify({"mensagem": "Email e senha são obrigatórios!"}), 400

        colaborador = db.session.execute(
            db.select(Colaborador).where(Colaborador.email == email)
        ).scalar()

        if not colaborador:
            return jsonify({"mensagem": "Colaborador não encontrado!"}), 404

        if  verificar_senha(senha, colaborador.senha):
            return jsonify({"mensagem": "Login realizado com sucesso!"}), 200
        else:
            return jsonify({"mensagem": "Email ou senha incorretos!"}), 401

    except Exception as e:
        # Captura qualquer exceção e retorna um erro genérico com a mensagem
        return jsonify({"erro": f"Ocorreu um erro inesperado: {str(e)}"}), 500


@bp_colaborador.route("/logout", methods=["POST"])
def logout():
    return jsonify({"mensagem": "Logout realizado com sucesso!"}), 200
