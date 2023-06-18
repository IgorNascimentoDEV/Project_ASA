import './App.css';
import Home from './components/Home';
import Maquina from './components/Maquina';
import Celular from './components/Celular';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Sistema de Gestão e Controle</h1>
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/"> Página Inicial</Nav.Link>
        <Nav.Link as={Link} to="/telefone">Telefone</Nav.Link>
        <Nav.Link as={Link} to="/maquina"> Maquina </Nav.Link>
      </Nav>

      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/telefone' element={<Celular/>}></Route>
        <Route path='/maquina'element={<Maquina/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
