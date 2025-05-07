import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Reembolsos.module.scss";
import Home from "../../assets/Dashboard/home header.png";
import Seta from "../../assets/Dashboard/Vector.png";
import Analises from "../../assets/Dashboard/Análises.png";
import NumeroAnalises from "../../assets/Dashboard/N-Análises.png";
import NumeroAprovados from "../../assets/Dashboard/N-Aprovados.png";
import NumeroRejeitados from "../../assets/Dashboard/N-Rejeitados.png";
import NumeroSolicitados from "../../assets/Dashboard/N-Solicitados.png";
import Sistema from "../../assets/Dashboard/Sistema-atualizado.png";
import SolicitarHistorico from "../../assets/Dashboard/Solicitar - Histórico.png";
import SolicitarReembolso from "../../assets/Dashboard/Solicitar - Reembolso.png";
import Api from "../../Services/Api.jsx";

function Rembolsos() {
  const navigate = useNavigate();
  const [totalSolicitacoes, setTotalSolicitacoes] = useState(0);
  const [totalEmAnalise, setTotalEmAnalise] = useState(0);
  const [totalAprovados, setTotalAprovados] = useState(0);
  const [totalRejeitados, setTotalRejeitados] = useState(0);

  useEffect(() => {
    const buscarSolicitacoes = async () => {
      try {
        const token = localStorage.getItem("$token");
        const response = await Api.get("/reembolso/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = response.data;
        setTotalSolicitacoes(dados.length);
        setTotalEmAnalise(
          dados.filter((item) => item.status === "Em análise").length
        );
        setTotalAprovados(
          dados.filter((item) => item.status === "Aprovado").length
        );
        setTotalRejeitados(
          dados.filter((item) => item.status === "Rejeitado").length
        );
      } catch (error) {
        console.error("Erro ao enviar:", error);
      }
    };

    buscarSolicitacoes();
  }, []);

  return (
    <div className={styles.body}>
      <header className={styles.headerRembolsos}>
        <img src={Home} alt="Casinha da header" />
        <img src={Seta} alt="Setinha da header" />
        <p>Reembolsos</p>
      </header>

      <main className={styles.mainReembolsos}>
        <div className={styles.containerTxtRembolsos}>
          <h1>Sistema de Reembolsos</h1>
          <p>
            Solicite novos pedidos de reembolso, visualize solicitações em
            análise e todo o histórico.
          </p>
        </div>

        <section className={styles.containerCards}>
          <article
            onClick={() => {
              navigate("/solicitacao");
            }}
          >
            <img src={SolicitarReembolso} alt="" />
            <h1>Solicitar Reembolso</h1>
          </article>

          <article>
            <img src={Analises} alt="" />
            <h1>Verificar análises</h1>
          </article>

          <article>
            <img src={SolicitarHistorico} alt="" />
            <h1>Histórico</h1>
          </article>
        </section>

        <section className={styles.containerDados}>
          <div>
            <img
              className={styles.imgSolicitados}
              src={NumeroSolicitados}
              alt=""
            />
            <h4>{totalSolicitacoes}</h4>
            <p>Solicitados</p>
          </div>

          <div>
            <img className={styles.imgAnalise} src={NumeroAnalises} alt="" />
            <h4>{totalEmAnalise}</h4>
            <p>Em análise</p>
          </div>

          <div>
            <img className={styles.imgAprovados} src={NumeroAprovados} alt="" />
            <h4>{totalAprovados}</h4>
            <p>Aprovados</p>
          </div>

          <div>
            <img
              className={styles.imgRejeitados}
              src={NumeroRejeitados}
              alt=""
            />
            <h4>{totalRejeitados}</h4>
            <p>Rejeitados</p>
          </div>
        </section>

        <section className={styles.containerSistema}>
          <img src={Sistema} alt="" />
          <a href="#">Sistema atualizado.</a>
        </section>
      </main>
    </div>
  );
}

export default Rembolsos;
