import React from "react";
import "../App.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    
    const usuario ={
        email: this.state.email,
        password: this.state.password
    }

    fetch("http://localhost:4000/produto/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    }).then((response) => {
      if (response.ok) {
        alert("Usuario cadastrado com sucesso")
      } else {
        alert("Error ao Cadastrar o Usuario");
      }
    });
  };

  atualizarEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  atualizarPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <div className="login-form-wrap">
        <h2 className="login-h2">Login</h2>
        <form className="login-form">
          <input
            className="login-input"
            onChange={this.atualizarEmail}
            type="email"
            name="email"
            placeholder="email"
            required
          />
          <input
            className="login-input"
            onChange={this.atualizarPassword}
            type="password"
            name="password"
            placeholder="password"
            required
          />

          <button
            type="submit"
            className="btn-login"
            onClick={this.handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
