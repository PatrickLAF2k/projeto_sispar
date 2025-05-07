from flask import Blueprint, request, jsonify
from src.model.colaborador_model import Colaborador
from src.model import db
from flasgger import swag_from
import cloudinary.uploader
import cloudinary
from src.security.security import (
    hash_senha,
    verificar_senha,
    criar_token,
    decodificar_token,
)

bp_colaborador = Blueprint("colaborador", __name__, url_prefix="/colaborador")


@bp_colaborador.route("/cadastrar", methods=["POST"])
@swag_from("../docs/colaborador/cadastrar_colaborador.yml")
def cadastrar_novo_colaborador():

    nome = request.form.get("nome")
    email = request.form.get("email")
    senha = request.form.get("senha")
    cargo = request.form.get("cargo")
    salario = request.form.get("salario")
    foto = request.files.get("foto")

    try:

        if foto == None:
            foto_url = "None"

        if not nome or not email or not senha or not cargo or not salario:
            return jsonify({"mensagem": "Todos os campos são obrigatorios!"}), 400

        colaborador_existente = db.session.execute(
            db.select(Colaborador).where(Colaborador.email == email)
        ).scalar()

        if colaborador_existente:
            return jsonify({"mensagem": "Email já cadastrado!"}), 409

        if foto:
            upload_result = cloudinary.uploader.upload(foto)
            foto_url = upload_result.get("secure_url")
            print(foto_url)

        novo_colaborador = Colaborador(
            nome=nome,
            email=email,
            senha=hash_senha(senha),
            cargo=cargo,
            salario=salario,
            foto_url=foto_url,
        )

        # Adiciona o novo colaborador à sessão do banco de dados
        db.session.add(novo_colaborador)

        # Salva (commit) as mudanças no banco de dados
        db.session.commit()

        # Retorna uma mensagem de sucesso e o status HTTP 201 (Created)
        return jsonify({"mensagem": f"Colaborador {nome} cadastrado com sucesso!"}), 201

    except Exception as e:
        print(f"Erro no backend: {e}")
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

        colaborador.to_dict()

        if verificar_senha(senha, colaborador.senha):

            token = criar_token({"id": colaborador.id})

            return (
                jsonify({"mensagem": "Login realizado com sucesso!", "token": token}),
                200,
            )
        else:
            return jsonify({"mensagem": "Email ou senha incorretos!"}), 401

    except Exception as e:
        return jsonify({"erro": f"Ocorreu um erro inesperado: {str(e)}"}), 500


@bp_colaborador.route("/dados", methods=["GET"])
def dados_colaboradores():
    header_token = request.headers.get("Authorization")
    try:
        token = header_token.split("Bearer ")[1]
        id = decodificar_token(token)

        colaborador = Colaborador.query.filter_by(id=id["id"]).first()
        dados_colaborador = colaborador.dados()

        return jsonify(dados_colaborador), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 4020


@bp_colaborador.route("/listar", methods=["GET"])
def listar_colaboradores():
    try:
        colaboradores = Colaborador.query.all()
        dados_colaboradores = [colaborador.dados() for colaborador in colaboradores]

        return jsonify(dados_colaboradores), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


@bp_colaborador.route("/logout", methods=["POST"])
def logout():
    return jsonify({"mensagem": "Logout realizado com sucesso!"}), 200
