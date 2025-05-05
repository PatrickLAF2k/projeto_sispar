import { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar.jsx";
import styles from "./Solicitacao.module.scss";
import Home from "../../assets/Dashboard/home header.png";
import Seta from "../../assets/Dashboard/Vector.png";
import Salvar from "../../assets/Solicitacao/+.png";
import Deletar from "../../assets/Solicitacao/deletar.png";
import Lixeira from "../../assets/Solicitacao/lixeira.png";
import Motivo from "../../assets/Solicitacao/motivo.png";
import Check from "../../assets/Solicitacao/check.png";
import Cancelar from "../../assets/Solicitacao/x.png";
import Api from "../../Services/Api.jsx";

function Solicitacao() {
  const [colaborador, setColaborador] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [nPrestacao, setNPrestacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [tipo_reembolso, setTipoReembolso] = useState("");
  const [centro_custo, setCentroCusto] = useState("");
  const [ordemInterna, setOrdemInterna] = useState("");
  const [divisao, setDivisao] = useState("");
  const [pep, setPep] = useState("");
  const [moeda, setMoeda] = useState("");
  const [distanciaKm, setDistanciaKm] = useState("");
  const [valorKm, setValorKm] = useState("");
  const [valorFaturado, setValorFaturado] = useState("");
  const [despesas, setDespesas] = useState("");
  const [id_colaborador, setIdColaborador] = useState("1");
  const [dadosReembolso, setDadosReembolso] = useState([]);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (enviado) {
      setDadosReembolso([]);
      setEnviado(false);
    }
  }, [enviado]);

  const handleSubmit = () => {
    if (!colaborador || !empresa || !data) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const objetoReembolso = {
      colaborador,
      empresa,
      numero_prestacao: nPrestacao,
      descricao,
      data,
      tipo_reembolso,
      centro_custo,
      ordem_interna: ordemInterna,
      divisao,
      pep,
      moeda,
      distancia_km: distanciaKm,
      valor_km: valorKm,
      valor_faturado: valorFaturado,
      despesas,
      id_colaborador,
    };

    setDadosReembolso([...dadosReembolso, objetoReembolso]);
    limparCampos();
  };

  const enviarParaAnalise = async () => {
    if (dadosReembolso.length === 0) {
      alert("Nenhum reembolso para enviar!");
      return;
    }

    try {
      // Substitua pela forma correta de obter o token, se necessário;
      const response = await Api.post("/reembolso/solicitar", dadosReembolso, {
        
      });
      setEnviado(true);
      alert("Solicitação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  const handleDelete = (index) => {
    setDadosReembolso(dadosReembolso.filter((item, i) => i !== index));
  };

  const limparCampos = () => {
    setColaborador("");
    setEmpresa("");
    setNPrestacao("");
    setDescricao("");
    setData("");
    setTipoReembolso("");
    setCentroCusto("");
    setOrdemInterna("");
    setDivisao("");
    setPep("");
    setMoeda("");
    setDistanciaKm("");
    setValorKm("");
    setValorFaturado("");
    setDespesas("");
  };

  const cancelarSolicitacao = () => {
    setDadosReembolso([]);
    limparCampos();
  };

  return (
    <div className={styles.layoutBody}>
      <NavBar />

      {/* Azul */}
      <header className={styles.headerSolicitacao}>
        <img src={Home} alt="Vetor da casinha" />
        <img src={Seta} alt="Vetor da setinha" />
        <p>Reembolsos</p>
        <img src={Seta} alt="Vetor da setinha" />
        <p>Solicitação de Reembolsos</p>
      </header>

      {/* VERDE */}
      <section className={styles.sectionSolicitacao}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGrupo1}>
            <div className={styles.inputNome}>
              <label htmlFor="colaborador">Nome Completo</label>
              <input
                id="colaborador"
                value={colaborador}
                name="colaborador"
                onChange={(e) => setColaborador(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.inputEmpresa}>
              <label htmlFor="empresa">Empresa</label>
              <input
                id="empresa"
                name="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.inputPrestacao}>
              <label htmlFor="nPrestacao">Nº Prest. Contas</label>
              <input
                id="nPrestacao"
                value={nPrestacao}
                onChange={(e) => setNPrestacao(e.target.value)}
                type="number"
                name="nPrestacao"
              />
            </div>

            <div className={styles.inputMotivo}>
              <label htmlFor="descricao">Descrição / Motivo do Reembolso</label>
              <textarea
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGrupo2}>
            <div className={styles.inputData}>
              <label htmlFor="data">Data</label>
              <input
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                type="date"
                name="data"
              />
            </div>

            <div className={styles.inputDespesas}>
              <label htmlFor="tipo_reembolso">Tipo de Despesa</label>
              <select
                id="tipo_reembolso"
                value={tipo_reembolso}
                name="tipo_reembolso"
                onChange={(e) => setTipoReembolso(e.target.value)}
              >
                <option value="">Selecionar</option>
                <option value="alimentacao">Alimentação</option>
                <option value="combustivel">Combustível</option>
                <option value="conducao">Condução</option>
                <option value="estacionamento">Estacionamento</option>
                <option value="viagem adm">Viagem admin.</option>
                <option value="viagem oper">Viagem operacional</option>
                <option value="eventos">Eventos de representação</option>
              </select>
            </div>

            <div className={styles.centroDeCusto}>
              <label htmlFor="centro_custo">Centro de Custo</label>
              <select
                id="centro_custo"
                value={centro_custo}
                onChange={(e) => setCentroCusto(e.target.value)}
                name="centro_custo"
              >
                <option value="">Selecionar</option>
                <option value="FIN CONTROLES INTERNOS MTZ">
                  1100109002 - FIN CONTROLES INTERNOS MTZ
                </option>
                <option value="FIN VICE-PRESIDENCIA FINANCAS MTZ">
                  1100110002 - FIN VICE-PRESIDENCIA FINANCAS MTZ
                </option>
                <option value="FIN CONTABILIDADE MTZ">
                  1100110101 - FIN CONTABILIDADE MTZ
                </option>
              </select>
            </div>

            <div className={styles.ordem}>
              <label htmlFor="ordemInterna">Ord. Int.</label>
              <input
                id="ordemInterna"
                value={ordemInterna}
                name="ordemInterna"
                onChange={(e) => setOrdemInterna(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.divisoes}>
              <label htmlFor="divisao">Div.</label>
              <input
                id="divisao"
                type="text"
                name="divisao"
                value={divisao}
                onChange={(e) => setDivisao(e.target.value)}
              />
            </div>

            <div className={styles.pep}>
              <label htmlFor="pep">PEP</label>
              <input
                id="pep"
                value={pep}
                onChange={(e) => setPep(e.target.value)}
                name="pep"
                type="text"
              />
            </div>

            <div className={styles.moeda}>
              <label htmlFor="moeda">Moeda</label>
              <select
                id="moeda"
                value={moeda}
                onChange={(e) => setMoeda(e.target.value)}
                name="moeda"
              >
                <option value="">Selecionar</option>
                <option value="brl">BRL</option>
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
              </select>
            </div>

            <div className={styles.distancia}>
              <label htmlFor="distanciaKm">Dist. / Km</label>
              <input
                id="distanciaKm"
                value={distanciaKm}
                name="distanciaKm"
                onChange={(e) => setDistanciaKm(e.target.value)}
                type="text"
              />
            </div>

            <div className={styles.valorKm}>
              <label htmlFor="valorKm">Valor / Km</label>
              <input
                id="valorKm"
                value={valorKm}
                onChange={(e) => setValorKm(e.target.value)}
                name="valorKm"
                type="text"
              />
            </div>

            <div className={styles.valorFaturado}>
              <label htmlFor="valorFaturado">Val. Faturado</label>
              <input
                id="valorFaturado"
                type="text"
                name="valorFaturado"
                value={valorFaturado}
                onChange={(e) => setValorFaturado(e.target.value)}
              />
            </div>

            <div className={styles.despesa}>
              <label htmlFor="despesas">Despesa</label>
              <input
                id="despesas"
                type="text"
                name="despesas"
                value={despesas}
                onChange={(e) => setDespesas(e.target.value)}
              />
            </div>

            <div className={styles.botoes}>
              <button
                className={styles.salvar}
                onClick={handleSubmit}
                type="submit"
              >
                <img src={Salvar} alt="Salvar formulário" /> Salvar
              </button>

              <button
                className={styles.deletar}
                type="button"
                onClick={limparCampos}
              >
                <img src={Deletar} alt="Deletar formulário" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Rosa */}
      <section className={styles.sectionTable}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Colaborador(a)</th>
              <th>Empresa</th>
              <th>Nº Prest.</th>
              <th>Data</th>
              <th>Motivo</th>
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
            </tr>
          </thead>

          <tbody>
            {dadosReembolso.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    onClick={() => handleDelete(index)}
                    className={styles.btnLixeira}
                  >
                    <img
                      className={styles.lixeira}
                      src={Lixeira}
                      alt="Deletar linha"
                    />
                  </button>
                </td>
                <td>
                  <div className={styles.ellipsis} title={item.colaborador}>
                    {item.colaborador}
                  </div>
                </td>
                <td>{item.empresa}</td>
                <td>{item.numero_prestacao}</td>
                <td>{item.data}</td>
                <td className={styles.motivo}>
                  <button>
                    <img src={Motivo} alt="Ver motivo" />
                  </button>
                </td>
                <td>
                  <div className={styles.ellipsis} title={item.tipo_reembolso}>
                    {item.tipo_reembolso}
                  </div>
                </td>
                <td>
                  <div className={styles.ellipsis} title={item.centro_custo}>
                    {item.centro_custo}
                  </div>
                </td>
                <td>{item.ordem_interna}</td>
                <td>{item.divisao}</td>
                <td>{item.pep}</td>
                <td>{item.moeda}</td>
                <td>{item.distancia_km}</td>
                <td>{item.valor_km}</td>
                <td>{item.valor_faturado}</td>
                <td>{item.despesas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Laranja */}
      <footer className={styles.footerSolicitacao}>
        <section>
          <div className={styles.inputFooter}>
            <label>Total Faturado</label>
            <input
              type="text"
              value={dadosReembolso
                .reduce(
                  (total, item) => total + Number(item.valor_faturado || 0),
                  0
                )
                .toFixed(2)}
              readOnly
            />
          </div>

          <div className={styles.inputFooter}>
            <label>Total Despesa</label>
            <input
              type="text"
              value={dadosReembolso
                .reduce((total, item) => total + Number(item.despesas || 0), 0)
                .toFixed(2)}
              readOnly
            />
          </div>

          <button className={styles.buttonAnalise} onClick={enviarParaAnalise}>
            <img src={Check} alt="Enviar para análise" /> Enviar para Análise
          </button>

          <button
            className={styles.buttonCancelar}
            onClick={cancelarSolicitacao}
          >
            <img src={Cancelar} alt="Cancelar solicitação" /> Cancelar
            Solicitação
          </button>
        </section>
      </footer>
    </div>
  );
}

export default Solicitacao;
