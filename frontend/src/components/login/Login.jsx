import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png";
import styles from "./Login.module.scss";
import api from "../../Services/Api";
import CadastroModal from "../../modals/cadastro/CadastroModal";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const abrirCadastro = () => {
    setMostrarCadastro(true);
  };
  const fecharCadastro = () => {
    setMostrarCadastro(false);
  };

  const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post("/colaborador/login", {
        email: email,
        senha: senha,
      });
      
      const token = resposta.data.token;
      localStorage.setItem("$token", token);
      
      if (resposta.status === 200) {
        
        
        alert("Login realizado com sucesso!");
        navigate("/reembolsos");
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
