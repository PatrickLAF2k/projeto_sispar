from flask import Blueprint, request, jsonify
from src.model.reembolso_model import Reembolso
from src.model import db

bp_reembolso = Blueprint("reembolso", __name__, url_prefix="/reembolso")


@bp_reembolso.route("/solicitar", methods=["POST"])
def solicitar_reembolso():
    dados_requisicao = request.get_json()
    print(dados_requisicao)

    try:
        # Cria uma lista de instâncias de Reembolso a partir dos dados
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
                id_colaborador=requisicao["id_colaborador"],
            )
            for requisicao in dados_requisicao
        ]

        # Adiciona todos os reembolsos de uma vez no banco de dados
        db.session.bulk_save_objects(reembolsos)
        db.session.commit()

        return (
            jsonify({"mensagem": "Solicitações de reembolso criadas com sucesso!"}),
            201,
        )
    except Exception as e:
        db.session.rollback()  # Faz rollback em caso de erro
        return jsonify({"erro": str(e)}), 400


@bp_reembolso.route("/listar", methods=["GET"])
def listar_reembolsos():
    try:
    
        reembolsos = Reembolso.query.filter_by(id_colaborador= "1").all()

        return jsonify([reembolso.to_dict() for reembolso in reembolsos]), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 400
    
