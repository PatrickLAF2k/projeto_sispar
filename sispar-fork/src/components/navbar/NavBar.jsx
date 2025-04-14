import Historico from "../../assets/Header/Botão - Histórico.png";
import Home from "../../assets/Header/botão - Home.png";
import Pesquisa from "../../assets/Header/Botão - Pesquisa.png";
import Reembolso from "../../assets/Header/Botão - Reembolso.png";
import Sair from "../../assets/Header/Botão - Sair.png";
import Perfil from "../../assets/Header/image.png";
import Fechar from "../../assets/Header/imagem-fechar-header.png";
import styles from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navBarEstilo}>
      <button className={styles.buttonNavBar}>
        <img src={Fechar} alt="Botão abrir e fechar" />
      </button>

      <section>
        <img src={Perfil} alt="Foto do perfil" />

        <div>
          <button className={styles.buttonNavBar}
            onClick={() => {
              navigate("/reembolsos");
            }}
          >
            <img src={Home} alt="Botão Home" />
          </button>

          <button onClick={()=>{navigate("/solicitacao")}}  className={styles.buttonNavBar}>
            <img src={Reembolso} alt="Botão Reembolso" />
          </button>

          <button onClick={()=>{navigate("/reembolsos")}}  className={styles.buttonNavBar}>
            <img src={Pesquisa} alt="Botão Pesquisa" />
          </button>

          <button onClick={()=>{navigate("/solicitacao")}}  className={styles.buttonNavBar}>
            <img src={Historico} alt="Botão histórico" />
          </button>
        </div>
      </section>

      <button className={styles.buttonSair}  onClick={()=>{navigate("/")}} >
        <img src={Sair} alt="Botão sair" />
      </button>
    </nav>
  );
}

export default NavBar;
