import { useState } from "react";
import api from "../../Services/Api"; // Importa o serviço para fazer a requisição API
import styles from "./CadastroModal.module.scss"; // Importa o arquivo de estilos
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png"; // Importa o logo

export default function CadastroModal({ fecharModal }) {
  // Definindo estados para controlar os valores dos campos e mensagens de erro/sucesso
  const [nome, setNome] = useState(""); // Estado para o campo nome
  const [email, setEmail] = useState(""); // Estado para o campo email
  const [senha, setSenha] = useState(""); // Estado para o campo senha
  const [cargo, setCargo] = useState(""); // Estado para o campo cargo
  const [salario, setSalario] = useState(""); // Estado para o campo salário
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para a mensagem de erro

  // Função para cadastrar o colaborador
  const cadastrarColaborador = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    try {
      // Envia uma requisição POST para o backend com os dados do colaborador
      const resposta = await api.post("/colaborador/cadastrar", {
        nome: nome,
        email: email,
        senha: senha,
        cargo: cargo,
        salario: salario,
      });

      // Se o cadastro for bem-sucedido (status 201), exibe a mensagem de sucesso
      if (resposta.status === 201) {
        alert(`Colaborador ${nome} foi cadastrado com sucesso!`);
        fecharModal(); // Chama a função para fechar o modal
      }
    } catch (error) {
      setMensagemErro(error.response.data.mensagem); // Define a mensagem de erro
    }
  };

  return (
    <div className={styles.modalBody}>
      {" "}
      <div className={styles.modalContainer}>
        {" "}
        <img src={Logo} alt="Logo" />
        <h2>Cadastrar Novo Colaborador</h2> {/* Título do modal */}
        {/* Formulário de cadastro */}
        <form onSubmit={cadastrarColaborador} className={styles.formCadastro}>
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={nome} // O valor do campo 'nome' vem do estado
            onChange={(e) => setNome(e.target.value)} // Atualiza o valor do campo
            // Torna o campo obrigatório
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <input
            type="text"
            name="salario"
            placeholder="Salário"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />

          <div className={styles.modalButtons}>
            <button type="submit">Cadastrar</button>
            <button className={styles.cancelarButton} onClick={fecharModal}>
              Cancelar
            </button>{" "}
          </div>
        </form>
        <p className={styles.modalError}>{mensagemErro}</p>
      </div>
    </div>
  );
}
