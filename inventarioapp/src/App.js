import "./App.css";
import Home from "./components/Home";
import Maquina from "./components/Maquina";
import Celular from "./components/Celular";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/Asa-1.png";
import Card from "react-bootstrap/Card";
import Pagination from 'react-bootstrap/Pagination';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
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
                    <CDBSidebarMenuItem icon="columns" className="menu-item">
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
                    <CDBSidebarMenuItem icon="columns" className="menu-item">
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
                    <Route path="/" element={<Home />} />
                    <Route path="/telefone" element={<Celular />} />
                    <Route path="/maquina" element={<Maquina />} />
                  </Routes>
                  
                  <Pagination className="page">
                    <Pagination.Prev />
                    <Pagination.Ellipsis />
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Next />
                  </Pagination>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
