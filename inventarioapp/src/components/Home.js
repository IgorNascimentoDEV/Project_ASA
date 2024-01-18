import React, { useState } from "react";
import Equipamento from "./Equipamento";
import Colaborador from "./Colaborador";
import Inicio from "./Inicio";
import Movimentacao from "./Movimentacao";
import { BrowserRouter, Routes, Link, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBranca from "../assets/logo-branca.png";
import logo from "../assets/Asa-1.png";
import Card from "react-bootstrap/Card";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  BiUserPlus,
  BiSolidHome,
  BiDesktop,
  BiArrowBack,
  BiSolidShare,
  BiRepost
} from "react-icons/bi";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import "../index.css";

function initialState() {
  return { user: "", password: "" };
}

function Home() {
  const [values, setValues] = useState(initialState);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const { user, password } = values; // Desestruturação para obter apenas os campos necessários

    const usuario = { user, password };

    fetch(`http://localhost:5062/api/v1/auth?username=${user}&password=${password}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (response.ok) {
          // Se a resposta for OK (200), converte para JSON e realiza o login chamando a função do AuthContext
          return response.json();
        } else if (response.status === 401) {
          // Se a resposta for 401 (Unauthorized), lança um erro informando que as credenciais são inválidas
          throw new Error("Credenciais inválidas");
        } else {
          // Se ocorrer algum outro erro na requisição, lança um erro genérico
          throw new Error("Credenciais inválidas");
        }
      })
      .then((data) => {
        setToken(data);
        console.log(data);
      })
      .catch((error) => {
        // Em caso de erro, atualiza o estado com a mensagem de erro
        alert("Credenciais inválidas");
      });
  };

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleLogout = () => {
    setToken("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {token === "" ? (
        <div className="login-form-wrap">
          <div className="logo-form">
            <img className="logo-header" src={logo} alt="Logo" />
          </div>
          <h2 className="login-h2">STOCKHUB</h2>
          <form className="login-form">
            <input
              className="login-input"
              onChange={onChange}
              type="text"
              name="user"
              placeholder="usuario"
              required
              value={values.user}
            />
            <div className="input-container">
              <input
                className="login-input"
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                required
                value={values.password}
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </span>
            </div>
            <button type="submit" className="btn-login" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="App">
          <div className="header">
            <img className="logoAsa" src={logoBranca} alt="Logo" />
            <div className="textoHeader">
              <p className="fraseHeader"> Asa Industria e Comercio</p>
            </div>
          </div>

          <div className="body">
            <BrowserRouter>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <CDBSidebar
                  textColor="#333"
                  backgroundColor="rgb(240, 240, 240)"
                  className="sidebar"
                >
                  <CDBSidebarContent
                    className="sidebar-content"
                    style={{ textAlign: "center" }}
                  >
                    <CDBSidebarMenu>
                      <CDBSidebarMenuItem>
                        <NavLink exact as={Link} to="/home">
                          <CDBSidebarMenuItem className="menu-item ">
                            <BiSolidHome className="icon" />
                            Página Inicial
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>
                        <NavLink as={Link} to="/colaboradores">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiUserPlus className="icon" />
                            Colaboradores
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>
                        <NavLink as={Link} to="/equipamento">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiDesktop className="icon" />
                            Equipamentos
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>
                        <NavLink as={Link} to="/movimentacao">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiRepost className="icon" />
                            Movimentacão
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>

                      </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                  </CDBSidebarContent>
                  <div className="buttonHeader" variant="outline-secondary">
                    <button onClick={handleLogout} className="button-logout">
                      <BiSolidShare className="icon" />
                      Sair
                    </button>
                  </div>
                </CDBSidebar>


                <div className="content">
                  <div className="card">
                    <Card>
                      <Card.Body>
                        <Routes>
                          <Route path="/" element={<Inicio />} />
                          <Route path="/home" element={<Inicio />} />
                          <Route path="/colaboradores" element={<Colaborador />} />
                          <Route path="/equipamento" element={<Equipamento />} />
                          <Route path="/movimentacao" element={<Movimentacao />} />
                        </Routes>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
