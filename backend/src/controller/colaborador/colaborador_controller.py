from flask import Blueprint, request, jsonify
from src.model.colaborador_model import Colaborador
from src.model import db
from flasgger import swag_from
import cloudinary.uploader
import cloudinary
from src.security.security import ( hash_senha, verificar_senha, criar_token, decodificar_token,)
from src.middlewares.colaborador_middleware import (validar_cadastro, validar_login)

bp_colaborador = Blueprint("colaborador", __name__, url_prefix="/colaborador")


@bp_colaborador.route("/cadastrar", methods=["POST"])
@swag_from("../../docs/colaborador/cadastrar_colaborador.yml")
def cadastrar_novo_colaborador():
    data = request.get_json()
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    cargo = data.get("cargo")
    salario = data.get("salario")

    erro = validar_cadastro(data)
    if erro:
        return erro

    try:
        colaborador_existente = db.session.execute(
            db.select(Colaborador).where(Colaborador.email == email)
        ).scalar()

        if colaborador_existente:
            return jsonify({"mensagem": "Email já cadastrado."}), 409

        novo_colaborador = Colaborador(
            nome=nome,
            email=email,
            senha=hash_senha(senha),
            cargo=cargo,
            salario=salario,
            foto_url="",
        )

        db.session.add(novo_colaborador)

        db.session.commit()

        return jsonify({"mensagem": f"Colaborador {nome} cadastrado com sucesso!"}), 201

    except Exception as e:
        return jsonify({"erro": f"Ocorreu um erro inesperado: {str(e)}"}), 500


@bp_colaborador.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    senha = data["senha"]

    erro = validar_login(data)
    if erro:
        return erro

    try:
        colaborador = db.session.execute(
            db.select(Colaborador).where(Colaborador.email == email)
        ).scalar()

        if not colaborador:
            return jsonify({"mensagem": "Colaborador não encontrado."}), 404

        colaborador.to_dict()

        if verificar_senha(senha, colaborador.senha):

            token = criar_token({"id": colaborador.id})

            return (
                jsonify({"mensagem": "Login realizado com sucesso!", "token": token}),
                200,
            )
        else:
            return jsonify({"mensagem": "Email ou senha incorretos."}), 401

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

@bp_colaborador.route("/foto", methods=["PUT"])
def foto():
    foto = request.files.get("foto")
    header_token = request.headers.get("Authorization")

    if not foto:
        return jsonify({"erro": "Nenhuma foto enviada"}), 400

    try:
        token = header_token.split("Bearer ")[1]
        id = decodificar_token(token)
    except Exception as e:
        return jsonify({"erro": str(e)}), 401

    upload_result = cloudinary.uploader.upload(foto)
    foto_url = upload_result.get("secure_url")

    try:
        colaborador = db.session.get(Colaborador, id)
        colaborador.foto_url = foto_url
        db.session.commit()
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

    return (
        jsonify({"mensagem": "Foto atualizada com sucesso", "foto_url": foto_url}),
        200,
    )
