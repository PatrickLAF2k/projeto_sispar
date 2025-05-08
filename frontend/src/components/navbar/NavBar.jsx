import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Services/Api";

import Historico from "../../assets/Header/Botão - Histórico.png";
import Home from "../../assets/Header/botão - Home.png";
import Pesquisa from "../../assets/Header/Botão - Pesquisa.png";
import Reembolso from "../../assets/Header/Botão - Reembolso.png";
import Sair from "../../assets/Header/Botão - Sair.png";
import Fechar from "../../assets/Header/imagem-fechar-header.png";
import styles from "./NavBar.module.scss";
import fotoPerfil from "../../assets/Header/perfil.png";
import editFoto from "../../assets/Header/editButton.png";

function NavBar() {
  const navigate = useNavigate();
  const [colaborador, setColaborador] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      const token = localStorage.getItem("$token");
      const response = await Api.get("/colaborador/dados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColaborador(response.data);
    };
    buscarDados();
  }, []);

  const handleFoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);

    const token = localStorage.getItem("$token");

    try {
      const response = await Api.put("/colaborador/foto", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualize a foto localmente
      setColaborador((prev) => ({
        ...prev,
        foto_url: response.data.foto_url,
      }));
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
    }
  };

  return (
    <nav className={styles.navBar}>
      {/* ABRIR E FECHAR */}
      <button className={styles.buttonAbrirFechar}>
        <img src={Fechar} alt="Botão abrir e fechar" />
      </button>

      {/* FOTO PERFIL */}
      {colaborador && (
        <>
          <div className={styles.divFotoPerfil}>
            <div className={styles.alterarFoto}>
              <label htmlFor="foto">
                <img
                  src={editFoto}
                  alt="Foto do usuário"
                  className="img-botao"
                />
              </label>

              <input
                type="file"
                id="foto"
                onChange={handleFoto}
                className="input-escondido"
              />
            </div>
            <img
              src={
                colaborador.foto_url == "None"
                  ? fotoPerfil
                  : colaborador.foto_url || fotoPerfil
              }
              alt="Foto do perfil"
            />
            <h3>{colaborador.nome}</h3>
            <p>{colaborador.cargo}</p>
          </div>
        </>
      )}

      <section>
        <div>
          {/* INICIO */}
          <div className={styles.divButton}>
            <button
              className={styles.buttonNavBar}
              onClick={() => {
                navigate("/reembolsos");
              }}
            >
              <img src={Home} alt="Botão Home" />
            </button>
            <p>Início</p>
          </div>
          {/* REEMBOLSOS */}
          <div className={styles.divButton}>
            <button
              onClick={() => {
                navigate("/solicitacao");
              }}
              className={styles.buttonNavBar}
            >
              <img src={Reembolso} alt="Botão Reembolso" />
            </button>
            <p>Reembolsos</p>
          </div>

          {/* ANALISES */}
          <div className={styles.divButton}>
            <button
              onClick={() => {
                navigate("/reembolsos");
              }}
              className={styles.buttonNavBar}
            >
              <img src={Pesquisa} alt="Botão Pesquisa" />
            </button>
            <p>Análises</p>
          </div>

          {/* HISTORICO */}
          <div className={styles.divButton}>
            <button
              onClick={() => {
                navigate("/solicitacao");
              }}
              className={styles.buttonNavBar}
            >
              <img src={Historico} alt="Botão histórico" />
            </button>
            <p>Histórico</p>
          </div>
        </div>
      </section>

      {/* SAIR */}
      <button
        className={styles.buttonSair}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={Sair} alt="Botão sair" />
      </button>
    </nav>
  );
}

export default NavBar;
