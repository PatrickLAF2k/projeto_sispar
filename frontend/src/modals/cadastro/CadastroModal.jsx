import { useState } from "react";
import api from "../../Services/Api";
import styles from "./CadastroModal.module.scss";
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png";
import { set, setErrorMap, z } from "zod"

export default function CadastroModal({ fecharModal }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [erros, setErros] = useState({});



  const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    salario: z
      .number({ invalid_type_error: "Salário deve ser um número" })
      .min(0, "Salário não pode ser negativo"),
  });

  const cadastrarColaborador = async (e) => {
    e.preventDefault();

    const formData = {
      nome,
      email,
      senha,
      cargo,
      salario,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.format();
      const novosErros = {
        nome: fieldErrors.nome?._errors?.[0] || "",
        email: fieldErrors.email?._errors?.[0] || "",
        senha: fieldErrors.senha?._errors?.[0] || "",
        cargo: fieldErrors.cargo?._errors?.[0] || "",
        salario: fieldErrors.salario?._errors?.[0] || "",
      };
      setErros(novosErros);
      return;
    } else {
      setErros({});
    }

    const colaborador = {
      ...result.data,
      foto_url: "None",
    };


    try {
      const resposta = await api.post("/colaborador/cadastrar", colaborador, {

      });

      if (resposta.status === 201) {
        alert(`Colaborador ${nome} foi cadastrado com sucesso!`);
        fecharModal();
      }
    } catch (error) {
      setMensagemErro(error.response.data.mensagem);
    }
  };

  return (
    <div className={styles.modalBody}>
      {" "}
      <div className={styles.modalContainer}>
        {" "}
        <img src={Logo} alt="Logo" />
        <h2>Cadastrar Novo Colaborador</h2>

        <form onSubmit={cadastrarColaborador} className={styles.formCadastro}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="nome"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              o
            />
            {erros.nome && <span className={styles.alert}>{erros.nome}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {erros.email && <span className={styles.alert}>{erros.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erros.email && <span className={styles.alert}>{erros.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="cargo"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
            {erros.email && <span className={styles.alert}>{erros.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="salario"
              placeholder="Salário"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
            {erros.email && <span className={styles.alert}>{erros.email}</span>}
          </div>

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
