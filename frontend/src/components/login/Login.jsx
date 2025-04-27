import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png";
import styles from "./Login.module.scss";

function Login() {
  const navigate = useNavigate(); //Iniciando o hook useNavigate

  const irParaReembolsos = () => {
    navigate("/reembolsos"); //Redirecionando para a página de reembolsos
  };

  return (
    <main className={styles.mainLogin}>
      <section className={styles.containerFoto}>
        {/* <img src={Capa} alt="Foto de um navio cargueiro" /> */}
      </section>

      <section className={styles.containerDados}>
        <div className={styles.divLogo}>
          <img src={Logo} alt="Logo da wilson sons" />
          <h1>Boas vindas ao Novo Portal SISPAR </h1>
          <p>Sistema de Emissão de Boletos e Parcelamento</p>
        </div>

        <form action="">
          <input type="email" name="email" id="email" placeholder="Email" />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
          />

          <a href="#">Esqueci minha senha</a>

          <div className={styles.divButtons}>
            <button onClick={irParaReembolsos}>Entrar</button>
            <button>Criar conta</button>
          </div>
        </form>
      </section>
    </main>
  );
}
export default Login;
