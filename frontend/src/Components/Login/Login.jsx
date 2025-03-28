import backGround from "../../assets/TelaLogin/backgroundLogin.png";
import logo from "../../assets/TelaLogin/logo.png";
import styled, { createGlobalStyle, keyframes } from "styled-components";

export default function Login() {
  return (
    <>
      <GlobalStyle />
      <ContainerMain>
        <img src={backGround} alt="Imagem de um navio cargueiro" />
        <LoginSection>
          <Logo>
            <img src={logo} alt="Logo do Sispar" />
            <h2>Boas vindas ao Novo Portal SISPAR</h2>
            <h3>Sistema de Emissão de Boletos e Parcelamento</h3>
          </Logo>

          <div>
            <input type="email" id="email" name="email" />

            <input type="password" id="senha" name="senha" />
          </div>

          <a href="*">Esqueci minha senha</a>

          <div>
            <button>Entrar</button>
            <button>Criar conta</button>
          </div>
        </LoginSection>
      </ContainerMain>
    </>
  );
}

//Styles

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

const ContainerMain = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;

  img {
    width: 100%;
  }
`;

const LoginSection = styled.div`
  border: 3px dotted red;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: #23282F;
  }

  h3 {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: #23282F;
  }

  img {
    width: 60%;
  }
`;
