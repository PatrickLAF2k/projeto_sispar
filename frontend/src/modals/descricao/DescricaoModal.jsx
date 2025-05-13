import styles from "./DescricaoModal.module.scss";
import Logo from "../../assets/Tela_Login/logo_ws_sem_txt.png";


function ModalDescricao({ descricao, onClose, nprestacao }) {
  return (
    <div className={styles.modalBody}>

      <div className={styles.conteudo}>
        <img src={Logo} alt="Logo" />
        <h2>Descrição da solicitação Prestação n° {nprestacao}</h2>
        <p>{descricao}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalDescricao;
