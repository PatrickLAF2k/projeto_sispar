from flask import jsonify
import re

def validar_cadastro(data):
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    cargo = data.get("cargo")
    salario = data.get("salario")

    if not nome or not email or not senha or not cargo or not salario:
        return jsonify({"mensagem": "Todos os campos são obrigatórios."}), 400

    padrao_email = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(padrao_email, email):
        return jsonify({"mensagem": "Email com formato inválido."}), 400

    if len(senha) < 6:
        return jsonify({"mensagem": "Senha deve ter no mínimo 6 caracteres."}), 400

    if salario:
        padrao_salario = r'^\d{1,10}(\.\d{1,2})?$'
        if not re.match(padrao_salario, salario):
            return jsonify({"mensagem": "Salário com formato inválido. Ex: 0000.00"}), 400

        try:
            salario_float = float(salario)
            if salario_float < 0:
                return jsonify({"mensagem": "Salário não pode ser negativo."}), 400
        except ValueError:
            return jsonify({"mensagem": "Salário deve ser um número válido."}), 400

    return None



def validar_login(data):
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios."}), 400

    return None