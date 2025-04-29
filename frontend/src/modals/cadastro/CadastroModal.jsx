import { useState } from "react";
import api from "../../Services/Api"; // Importa o serviço para fazer a requisição API
import styles from "./CadastroModal.module.scss"; // Importa o arquivo de estilos
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png"; // Importa o logo

function CadastroModal({ fecharModal }) {
  // Definindo estados para controlar os valores dos campos e mensagens de erro/sucesso
  const [nome, setNome] = useState(""); // Estado para o campo nome
  const [email, setEmail] = useState(""); // Estado para o campo email
  const [senha, setSenha] = useState(""); // Estado para o campo senha
  const [cargo, setCargo] = useState(""); // Estado para o campo cargo
  const [salario, setSalario] = useState(""); // Estado para o campo salário
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para a mensagem de erro
  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Estado para a mensagem de sucesso

  // Função para cadastrar o colaborador
  const cadastrarColaborador = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    try {
      // Envia uma requisição POST para o backend com os dados do colaborador
      const resposta = await api.post("/colaboradores/cadastrar", {
        nome: nome,
        email: email,
        senha: senha,
        cargo: cargo,
        salario: salario,
      });

      // Se o cadastro for bem-sucedido (status 201), exibe a mensagem de sucesso
      if (resposta.status === 201) {
        setMensagemSucesso(resposta.data.mensagem); // Define a mensagem de sucesso
        setMensagemErro(""); // Limpa a mensagem de erro
        fecharModal(); // Chama a função para fechar o modal
      }
    } catch (error) {
      // Se ocorrer um erro na requisição, exibe a mensagem de erro
      if (error.response) {
        setMensagemErro(error.response.data.mensagem); // Define a mensagem de erro
        setMensagemSucesso(""); // Limpa a mensagem de sucesso
      }
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
            placeholder="Nome"
            value={nome} // O valor do campo 'nome' vem do estado
            onChange={(e) => setNome(e.target.value)} // Atualiza o valor do campo
            required // Torna o campo obrigatório
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
          <input
            type="number"
            name="salario"
            placeholder="Salário"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            required
          />

          {/* Exibe a mensagem de erro, se houver */}
          {mensagemErro && (
            <p className={styles.mensagemErro}>{mensagemErro}</p>
          )}
          {/* Exibe a mensagem de sucesso, se houver */}
          {mensagemSucesso && (
            <p className={styles.mensagemSucesso}>{mensagemSucesso}</p>
          )}
        </form>
        <div className={styles.modalButtons}>
          <button type="submit">Cadastrar</button>
          <button className={styles.cancelarButton} onClick={fecharModal}>
            Cancelar
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default CadastroModal;
