import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"


@pytest.mark.parametrize(
    "email, senha, status_code_esperado, mensagem_esperada",
    [
        ("", "dev", 400, "Todos os campos são obrigatorios!"),
        ("dev@email.com", "", 400, "Todos os campos são obrigatorios!"),
        ("naoexiste@email.com", "dev", 404, "Colaborador não encontrado!"),
        ("dev@email.com", "senhaerrada", 401, "Email ou senha incorretos!"),
        ("dev@email.com", "dev", 200, "Login realizado com sucesso"),
    ],
    ids=[
        "email_vazio",
        "senha_vazia",
        "usuario_inexistente",
        "senha_incorreta",
        "login_sucesso",
    ],
)
def test_login(email, senha, status_code_esperado, mensagem_esperada):
    dados = {"email": email, "senha": senha}
    response = requests.post(f"{BASE_URL}/colaborador/login", json=dados)

    assert (
        status_code_esperado == response.status_code
    ), f"Esperado {status_code_esperado}, mas recebeu {response.status_code}"

    mensagem_resposta = response.json().get("mensagem", "")
    assert (
        mensagem_esperada in mensagem_resposta
    ), f"Mensagem esperada: '{mensagem_esperada}', mas recebeu: '{mensagem_resposta}'"
