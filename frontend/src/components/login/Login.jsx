import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png";
import styles from "./Login.module.scss";
import api from "../../Services/Api";
import CadastroModal from "../../modals/cadastro/CadastroModal";

function Login() {
  const navigate = useNavigate(); //Iniciando o hook useNavigate

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const abrirCadastro = () => {
    setMostrarCadastro(true); // Exibe o modal de cadastro
  };
  const fecharCadastro = () => {
    setMostrarCadastro(false); // Fecha o modal de cadastro
  };

  if (email == "dev@gmail.com" && senha == "dev") {
    navigate("/reembolsos"); // Redireciona para a página de reembolsos DESENVOLVIMENTO
  }

  const fazerLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const resposta = await api.post("/colaborador/login", {
        email: email,
        senha: senha,
      });

      if (resposta.status === 200) {
        alert("Login realizado com sucesso!");
        navigate("/reembolsos"); // Redireciona para a página de reembolsos
      }
    } catch (error) {
      if (error.response) {
        setMensagemErro(error.response.data.mensagem);
      }
    }
  };

  return (
    <main className={styles.mainLogin}>
      <section className={styles.containerFoto}></section>

      <section className={styles.containerDados}>
        <div className={styles.divLogo}>
          {/* APAGAR DEPOIS------------------------------------------- */}
          <p>Login de  desenvolvimento <strong>dev@gmail.com senha dev</strong> </p>
          {/* APAGAR DEPOIS------------------------------------------- */}
          <img src={Logo} alt="Logo da wilson sons" />
          <h1>Boas vindas ao Novo Portal SISPAR</h1>
          <p>Sistema de Emissão de Boletos e Parcelamento</p>
        </div>

        <form className={styles.formLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <p className={styles.mensagemError}>{mensagemErro}</p>

          <a href="#">Esqueci minha senha</a>

          <div className={styles.divButtons}>
            <button onClick={fazerLogin}>Entrar</button>
            <button type="button" onClick={abrirCadastro}>
              {" "}
              Criar conta
            </button>
          </div>
        </form>
      </section>

      {/* Modal de Cadastro */}
      {mostrarCadastro && <CadastroModal fecharModal={fecharCadastro} />}
    </main>
  );
}

export default Login;
