import React, { useState } from "react";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import "firebase/auth";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [tipoMensagem, setTipoMensagem] = useState();

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resultado) => {
        setTipoMensagem("Sucesso");
      })
      .catch((error) => {
        setTipoMensagem("Erro");
      });
  };

  return (
    <div className="login-content d-flex align-items-center">
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
            Login
          </h1>
        </div>

        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="Email"
        />

        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Senha"
        />

        <button
          onClick={signIn}
          className="btn btn-lg btn-block btn-login my-2"
          type="button"
        >
          Entrar
        </button>

        <div className="msg-login text-white text-center my-5">
          {tipoMensagem === "Sucesso" && (
            <span>
              <strong>Wow!</strong> Você está conectado! &#128526;
            </span>
          )}
          {tipoMensagem === "Erro" && (
            <span>
              <strong>Ops!</strong> Verifique as credenciais de acesso!
              &#128546;
            </span>
          )}
        </div>

        <div className="opcoes-login mt-5 text-center">
          <Link to="create-account" className="mx-2">
            Recuperar senha
          </Link>
          <span className="text-white">&#9733;</span>
          <Link to="create-account" className="mx-2">
            Não tem uma conta?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
