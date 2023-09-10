import React, { useState, useContext } from "react";
import "../App.css";
import StoreContext from "../contexts/context";
import Home from "./Home";

function initialState() {
  return { user: "", password: "" };
}

function initialAuth(){
  return {auth : ""}
}

const Login = ({ navigate }) => {
  const [values, setValues] = useState(initialState);
  const [auth, setAuth] = useState(initialAuth);
  const { setToken } = useContext(StoreContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const { user, password } = values; 

    const usuario = { user, password };
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
        setToken(data);
        setAuth(data)
        console.log(data); // Imprimir o valor do token no console
        window.location("/home");
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

  return (
    <div>
      {auth === ""? (
         <div className="login-form-wrap">
         <h2 className="login-h2">Login</h2>
         <form className="login-form">
           <input
             className="login-input"
             onChange={onChange}
             type="user"
             name="user" // Alterado para "user"
             placeholder="user"
             required
             value={values.user}
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
        <Home />
      )}
    </div>
   
  );
};

export default Login;
