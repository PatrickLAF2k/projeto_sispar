import { useEffect, useState } from "react";
import Api from "../../Services/Api.jsx";
import Home from "../../assets/Dashboard/home header.png";
import Seta from "../../assets/Dashboard/Vector.png";
import motivoPng from "../../assets/Solicitacao/motivo.png";
import NumeroAnalises from "../../assets/Dashboard/N-Análises.png";
import NumeroAprovados from "../../assets/Dashboard/N-Aprovados.png";
import NumeroRejeitados from "../../assets/Dashboard/N-Rejeitados.png";
import NumeroSolicitados from "../../assets/Dashboard/N-Solicitados.png";
import ModalDescricao from "../../modals/descricao/DescricaoModal.jsx";
import styles from "./Historico.module.scss";

function Historico() {
  const [dadosReembolso, setDadosReembolso] = useState([]);
  const [totalSolicitacoes, setTotalSolicitacoes] = useState(0);
  const [totalEmAnalise, setTotalEmAnalise] = useState(0);
  const [totalAprovados, setTotalAprovados] = useState(0);
  const [totalRejeitados, setTotalRejeitados] = useState(0);
  const [descricaoModal, setDescricaoModal] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [nprestacao, setNprestacao] = useState("")

  useEffect(() => {
    const fetchReembolsos = async () => {
      try {
        const token = localStorage.getItem("$token");
        const response = await Api.get("/reembolso/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = response.data;

        setDadosReembolso(dados);
        setTotalSolicitacoes(dados.length);
        setTotalEmAnalise(dados.filter((item) => item.status === "Em análise").length);
        setTotalAprovados(dados.filter((item) => item.status === "Aprovado").length);
        setTotalRejeitados(dados.filter((item) => item.status === "Rejeitado").length);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchReembolsos();
  }, []);

  return (
    <>
      {modalAberto && (
        <ModalDescricao
          descricao={descricaoModal}
          onClose={() => setModalAberto(false)}
          nprestacao={nprestacao}
        />
      )}

      <div className={styles.Body}>

        <header className={styles.headerHistorico}>
          <img src={Home} alt="Vetor da casinha" />
          <img src={Seta} alt="Vetor da setinha" />
          <p>Reembolsos</p>
          <img src={Seta} alt="Vetor da setinha" />
          <p>Histórico</p>
        </header>

        <section className={styles.sectionTable}>
          <table>
            <thead>
              <tr>
                <th>Colaborador(a)</th>
                <th>Empresa</th>
                <th>Nº Prest.</th>
                <th>Data</th>
                <th>Descrição</th>
                <th>Tipo de despesa</th>
                <th>Ctr. Custo</th>
                <th>Ord. Int.</th>
                <th>Div.</th>
                <th>PEP</th>
                <th>Moeda</th>
                <th>Dist. Km</th>
                <th>Val. Km</th>
                <th>Val. Faturado</th>
                <th>Despesa</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dadosReembolso.length === 0 ? (
                <tr>
                  <td colSpan={17}>Nenhum reembolso encontrado.</td>
                </tr>
              ) : (
                dadosReembolso.map((item, index) => (
                  <tr key={item.id || index}> {/* ideal usar item.id se existir */}
                    <td>{item.colaborador}</td>
                    <td>{item.empresa}</td>
                    <td>{item.numero_prestacao}</td>
                    <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                    <td>
                      <img
                        src={motivoPng}
                        alt="Ver descrição"
                        onClick={() => {
                          setDescricaoModal(item.descricao);
                          setNprestacao(item.numero_prestacao);
                          setModalAberto(true);
                        }}
                      />
                    </td>
                    <td>{item.tipo_reembolso}</td>
                    <td>{item.centro_custo}</td>
                    <td>{item.ordem_interna}</td>
                    <td>{item.divisao}</td>
                    <td>{item.pep}</td>
                    <td>{item.moeda}</td>
                    <td>{item.distancia_km}</td>
                    <td>{item.valor_km}</td>
                    <td>{item.valor_faturado}</td>
                    <td>{item.despesas}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className={styles.containerDados}>
          <div>
            <img className={styles.imgSolicitados} src={NumeroSolicitados} alt="Solicitados" />
            <h4>{totalSolicitacoes}</h4>
            <p>Solicitados</p>
          </div>

          <div>
            <img className={styles.imgAnalise} src={NumeroAnalises} alt="Em análise" />
            <h4>{totalEmAnalise}</h4>
            <p>Em análise</p>
          </div>

          <div>
            <img className={styles.imgAprovados} src={NumeroAprovados} alt="Aprovados" />
            <h4>{totalAprovados}</h4>
            <p>Aprovados</p>
          </div>

          <div>
            <img className={styles.imgRejeitados} src={NumeroRejeitados} alt="Rejeitados" />
            <h4>{totalRejeitados}</h4>
            <p>Rejeitados</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Historico;
