from flask import jsonify
from flask_bcrypt import bcrypt
import jwt
from dotenv import load_dotenv

load_dotenv()
import os

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")


def hash_senha(senha):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw((senha.encode("utf-8")), salt)


def verificar_senha(senha, senha_hash):
    return bcrypt.checkpw(senha.encode("utf-8"), senha_hash.encode("utf-8"))


def criar_token(dados):
    token = jwt.encode(dados, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

def decodificar_token(token):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        return jsonify({"erro": "Token expirado!"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"erro": "Token inválido!"}), 401

