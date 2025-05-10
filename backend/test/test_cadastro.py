import requests
import pytest

BASE_URL = "http://127.0.0.1:5000"
nome = "teste teste teste"
email = "teste@gmail.com"
senha = "123456"
cargo = "teste"
salario = "1000.00"


@pytest.mark.parametrize(
    "nome, email, senha, cargo, salario,  status_code_esperado, mensagem_esperada",
    [
        ("", email, senha, cargo, salario, 400, "Todos os campos são obrigatórios."), #"nome_em_branco",
        (nome, "", senha, cargo, salario, 400, "Todos os campos são obrigatórios."),#"email_em_branco",
        (nome, email, "", cargo, salario, 400, "Todos os campos são obrigatórios."),#"senha_em_branco",
        (nome, email, senha, "", salario, 400, "Todos os campos são obrigatórios."),#"cargo_em_branco",
        (nome, email, senha, cargo, "", 400, "Todos os campos são obrigatórios."),#"salario_em_branco",
        (nome, email, senha, cargo, "100.020.", 400, "Salário com formato inválido. Ex: 0000.00"),#"salario_formato_errado",
        (nome, email, senha, cargo, "-1", 400, "Salário com formato inválido. Ex: 0000.00"),#"salario_negativo",
        (nome, "testegmail.com", senha, cargo, salario, 400, "Email com formato inválido."),#"email_sem_arroba",
        (nome, "teste@gmail", senha, cargo, salario, 400, "Email com formato inválido."),#"email_sem_dominio",
        (nome, email, "12345", cargo, salario, 400, "Senha deve ter no mínimo 6 caracteres."),#"senha_muito_curta",
        (nome, "testeduplicado@gmail.com", senha, cargo, salario, 409, "Email já cadastrado."),#"email_duplicado",
        (nome, email, senha, cargo, salario, 201, f"Colaborador {nome} cadastrado com sucesso!"),#"cadastro_realizado"



        
    ],
    ids=[
        "nome_em_branco",
        "email_em_branco",
        "senha_em_branco",
        "cargo_em_branco",
        "salario_em_branco",
        "salario_formato_errado",
        "salario_negativo",
        "email_sem_arroba",
        "email_sem_dominio",
        "senha_muito_curta",
        "email_duplicado",
        "cadastro_realizado"

    ]
)
def test_cadastro(nome, email, senha, cargo, salario,  status_code_esperado, mensagem_esperada):
    dados ={
    "nome": nome,
    "email": email,
    "senha": senha,
    "cargo": cargo,
    "salario": salario
    }
    response = requests.post(f"{BASE_URL}/colaborador/cadastrar", json=dados)

    assert (
        status_code_esperado == response.status_code
    ), f"ESPERANDO {status_code_esperado}, RETORNO {response.status_code}"

    mensagem_resposta = response.json().get("mensagem", "")
    assert (
        mensagem_esperada == mensagem_resposta
    ), f"Mensagem esperada: '{mensagem_esperada}', mas recebeu: '{mensagem_resposta}'"


