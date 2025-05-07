from flask import Blueprint, request, jsonify
from src.model.reembolso_model import Reembolso
from src.model import db
from src.security.security import decodificar_token

bp_reembolso = Blueprint("reembolso", __name__, url_prefix="/reembolso")


@bp_reembolso.route("/solicitar", methods=["POST"])
def solicitar_reembolso():
    dados_requisicao = request.get_json()
    header_token = request.headers.get("Authorization")
    token = header_token.split("Bearer ")[1]
    id = decodificar_token(token)

    try:

        reembolsos = [
            Reembolso(
                colaborador=requisicao["colaborador"],
                empresa=requisicao["empresa"],
                numero_prestacao=requisicao["numero_prestacao"],
                descricao=requisicao["descricao"],
                data=requisicao["data"],
                tipo_reembolso=requisicao["tipo_reembolso"],
                centro_custo=requisicao["centro_custo"],
                ordem_interna=requisicao["ordem_interna"],
                divisao=requisicao["divisao"],
                pep=requisicao["pep"],
                moeda=requisicao["moeda"],
                distancia_km=requisicao["distancia_km"],
                valor_km=requisicao["valor_km"],
                valor_faturado=requisicao["valor_faturado"],
                despesas=requisicao["despesas"],
                id_colaborador=id["id"],
            )
            for requisicao in dados_requisicao
        ]

        db.session.bulk_save_objects(reembolsos)
        db.session.commit()

        return (
            jsonify({"mensagem": "Solicitações de reembolso criadas com sucesso!"}),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": str(e)}), 400


@bp_reembolso.route("/listar", methods=["GET"])
def listar_reembolsos():
    header_token = request.headers.get("Authorization")
    token = header_token.split("Bearer ")[1]
    id = decodificar_token(token)

    try:

        reembolsos = Reembolso.query.filter_by(id_colaborador=id["id"]).all()

        return jsonify([reembolso.to_dict() for reembolso in reembolsos]), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    
@bp_reembolso.route("/listar/prestacao", methods=["POST"])
def listar_reembolsos_prestacao():
    dados_requisicao = request.get_json()
    
    try:
        reembolsos = Reembolso.query.filter_by(numero_prestacao=dados_requisicao["numero_prestacao"]).all()

        return jsonify([reembolso.to_dict() for reembolso in reembolsos]), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


        
