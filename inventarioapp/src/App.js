import './App.css';
import Home from './components/Home';
import Sobre from './components/Sobre';
import Produtos from './components/Produtos';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Minha aplicação em React</h1>
      <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/"> Página Inicial</Nav.Link>
        <Nav.Link as={Link} to="/produtos"> Cadastro de Produtos</Nav.Link>
        <Nav.Link as={Link} to="/sobre"> Sobre </Nav.Link>
      </Nav>

      
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/produtos' element={<Produtos/>}></Route>
        <Route path='/sobre'element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
