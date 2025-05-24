from flask import jsonify
import re

def validar_reembolso(data):
    empresa = data.get("empresa")
    colaborador = data.get("colaborador")
    numero_prestacao = data.get("numero_prestacao")
    descricao = data.get("descricao")
    tipo_reembolso = data.get("tipo_reembolso")
    ordem_interna = data.get("ordem_interna")
    centro_custo = data.get("centro_custo")
    divisao = data.get("divisao")
    pep = data.get("pep")
    distancia_km = data.get("distancia_km")
    valor_km = data.get("valor_km")
    valor_faturado = data.get("valor_faturado")
    despesas = data.get("despesas")


    if not empresa or not colaborador or not numero_prestacao or not tipo_reembolso or not ordem_interna or not centro_custo or not divisao or not pep or not valor_faturado:
        return jsonify({"mensagem": "Somente os campos Dist.km e Valor.km não são obrigatorios!"}), 400

    # padrao_email = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    # if not re.match(padrao_email, email):
    #     return jsonify({"mensagem": "Email com formato inválido."}), 400

    # if len(senha) < 6:
    #     return jsonify({"mensagem": "Senha deve ter no mínimo 6 caracteres."}), 400

    # if salario:
    #     padrao_salario = r'^\d{1,10}(\.\d{1,2})?$'
    #     if not re.match(padrao_salario, salario):
    #         return jsonify({"mensagem": "Salário com formato inválido. Ex: 0000.00"}), 400

    #     try:
    #         salario_float = float(salario)
    #         if salario_float < 0:
    #             return jsonify({"mensagem": "Salário não pode ser negativo."}), 400
    #     except ValueError:
    #         return jsonify({"mensagem": "Salário deve ser um número válido."}), 400

    return None



def validar_login(data):
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"mensagem": "Email e senha são obrigatórios."}), 400

    return None