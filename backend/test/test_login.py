import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"
email = "teste@gmail.com"
senha = "123456"

@pytest.mark.parametrize(
    "email, senha, status_code_esperado, mensagem_esperada",
    [
        ("", senha, 400, "Email e senha são obrigatórios."),
        (email, "", 400, "Email e senha são obrigatórios."),
        ("naoexiste@email.com", senha, 404, "Colaborador não encontrado."),
        ("teste@gmail.com", "senha errada", 401, "Email ou senha incorretos."),
        ("teste@gmail.com", senha, 200, "Login realizado com sucesso!"),
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
    dados = {
    "email": email,
    "senha": senha
    }
    response = requests.post(f"{BASE_URL}/colaborador/login", json=dados)

    assert (
        status_code_esperado == response.status_code
    ), f"ESPERANDO {status_code_esperado}, RETORNO {response.status_code}"

    mensagem_resposta = response.json().get("mensagem", "")
    assert (
        mensagem_esperada == mensagem_resposta
    ), f"Mensagem esperada: '{mensagem_esperada}', mas recebeu: '{mensagem_resposta}'"