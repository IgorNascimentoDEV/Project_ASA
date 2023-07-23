import React, { useState } from "react";
import Maquina from "./Maquina";
import Colaborador from "./Colaborador";
import Inicio from "./Inicio";
import Utensilio from "./Utensilio";
import Usuarios from "./Usuarios";
import { BrowserRouter, Routes, Link, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoBranca from "../assets/logo-branca.png";
import logo from "../assets/Asa-1.png";
import Card from "react-bootstrap/Card";
import {
  BiAt,
  BiSolidPhoneCall,
  BiUserPlus,
  BiSolidHome,
  BiDesktop,
  BiArrowBack,
} from "react-icons/bi";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import "../App.css";

function initialState() {
  return { email: "", password: "" };
}

function Home() {
  const [values, setValues] = useState(initialState);
  const [auth, setAuth] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = values; // Desestruturação para obter apenas os campos necessários

    const usuario = { email, password };
    console.log(usuario);

    fetch("http://localhost:4000/produto/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
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
          throw new Error("Erro ao realizar login");
        }
      })
      .then((data) => {
        setAuth(data);
        console.log(data);
      })
      .catch((error) => {
        // Em caso de erro, atualiza o estado com a mensagem de erro
        alert("Erro ao acessar o servidor");
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
    setAuth("");
  };

  return (
    <div>
      {auth === "" ? (
        <div className="login-form-wrap">
          <div className="logo-form">
            <img className="logo-header" src={logo} alt="Logo" />
          </div>
          <h2 className="login-h2">STOCKHUB</h2>
          <form className="login-form">
            <input
              className="login-input"
              onChange={onChange}
              type="email"
              name="email" // Alterado para "email"
              placeholder="email"
              required
              value={values.email}
            />
            <input
              className="login-input"
              onChange={onChange}
              type="password"
              name="password"
              placeholder="password"
              required
              value={values.password}
            />

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
            <div className="buttonHeader" variant="outline-secondary">
              <button onClick={handleLogout}>
                <BiArrowBack />
                Logout
              </button>
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
                          <CDBSidebarMenuItem className="menu-item">
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
                        <NavLink as={Link} to="/maquina">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiDesktop className="icon" />
                            Maquina
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>
                        <NavLink as={Link} to="/utensilios">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiAt className="icon" />
                            Utensilios
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                      <CDBSidebarMenuItem>
                        <NavLink as={Link} to="/usuarios">
                          <CDBSidebarMenuItem className="menu-item">
                            <BiUserPlus className="icon" />
                            Usuarios
                          </CDBSidebarMenuItem>
                        </NavLink>
                      </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                  </CDBSidebarContent>
                </CDBSidebar>

                <div className="content">
                  <div className="card">
                    <Card>
                      <Card.Body>
                        <Routes>
                          <Route path="/" element={<Inicio />} />
                          <Route path="/home" element={<Inicio />} />
                          <Route path="/colaboradores" element={<Colaborador />} />
                          <Route path="/maquina" element={<Maquina />} />
                          <Route path="/utensilios" element={<Utensilio />} />
                          <Route path="/usuarios" element={<Usuarios />} />
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
