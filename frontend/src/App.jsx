import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Reembolsos from "./components/reembolsos/Reembolsos.jsx";
import Solicitacao from "./components/solicitacao/Solicitacao.jsx";
import NavBar from "../src/components/navbar/NavBar.jsx";
import "./global.scss";

function AppWrapper() {
  const location = useLocation();
 
  const mostrarNavBar = location.pathname !== "/";

  return (
    <>
      {mostrarNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reembolsos" element={<Reembolsos />} />
        <Route path="/solicitacao" element={<Solicitacao />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
