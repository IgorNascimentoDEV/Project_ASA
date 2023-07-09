import React, { useState } from "react";
import Maquina from "./Maquina";
import Celular from "./Celular";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/Asa-1.png";
import Card from "react-bootstrap/Card";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
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
          <h2 className="login-h2">Login</h2>
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
          <BrowserRouter>
            <div
              style={{
                display: "flex",
                height: "100vh",
                overflow: "scrollinitial",
                textAlign: "center",
              }}
            >
              <CDBSidebar textColor="#333" backgroundColor="#0796f2">
                <CDBSidebarHeader
                  prefix={<i className="fa fa-bars fa-large"></i>}
                  style={{ borderBottom: "none" }}
                >
                  <a
                    href="/"
                    className="text-decoration-none"
                    style={{ color: "inherit" }}
                  >
                    Opções
                  </a>
                </CDBSidebarHeader>

                <CDBSidebarContent
                  className="sidebar-content"
                  style={{ textAlign: "center" }}
                >
                  <CDBSidebarMenu>
                    <CDBSidebarMenuItem>
                      <Nav.Link
                        exact
                        as={Link}
                        to="/"
                        activeClassName="activeClicked"
                      >
                        <CDBSidebarMenuItem
                          icon="columns"
                          className="menu-item"
                        >
                          Página Inicial
                        </CDBSidebarMenuItem>
                      </Nav.Link>
                    </CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>
                      <Nav.Link as={Link} to="/telefone" className="teste">
                        <CDBSidebarMenuItem
                          icon="exclamation-circle"
                          className="menu-item"
                        >
                          Telefone
                        </CDBSidebarMenuItem>
                      </Nav.Link>
                    </CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>
                      <Nav.Link as={Link} to="/maquina">
                        <CDBSidebarMenuItem
                          icon="columns"
                          className="menu-item"
                        >
                          Maquina
                        </CDBSidebarMenuItem>
                      </Nav.Link>
                    </CDBSidebarMenuItem>
                  </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: "center" }}>
                  <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
                </CDBSidebarFooter>
              </CDBSidebar>

              <div className="content">
                <div className="cabecalho">
                  <img className="logo" src={logo} alt="Logo" />
                  <h1>Sistema de Gestão e Controle</h1>
                </div>
                <div className="card">
                  <Card>
                    <Card.Body>
                      <Routes>
                        <Route path="/telefone" element={<Celular />} />
                        <Route path="/maquina" element={<Maquina />} />
                      </Routes>

                     
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </BrowserRouter>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
