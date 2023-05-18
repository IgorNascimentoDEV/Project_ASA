import './App.css';
import Home from './components/Home';
import Sobre from './components/Sobre';
import Produtos from './components/Produtos';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Minha aplicação em React</h1>
      <BrowserRouter>
      <ul>
        <li><Link to="/">Página inicial</Link></li>
        <li><Link to="/produtos">Cadastro de Produto</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
      </ul>
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
