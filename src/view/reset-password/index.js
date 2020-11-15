import React, { useState } from "react";
import firebase from "../../config/firebase";

import "firebase/auth";

import "./reset-password.css";

// Components
import Navbar from "../../components/navbar";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const recuperarSenha = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((result) => {
        setMessage(
          "Enviamos um link para seu e-mail. Acesse e redefina a senha."
        );
      })
      .catch((error) => {
        setMessage(
          "Não foi possível redefinir sua senha. Verifique se o e-mail está correto!"
        );
      });
  };

  return (
    <>
      <Navbar />
      <form className="text-center form-login mx-auto mt-5">
        <h3 className="mb-3 font-weight-bold">Recuperar Senha</h3>
        <input
          type="email"
          className="form-control my-2"
          placeholder="E-mail"
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="message my-4 text-center">
          <span>{message}</span>
        </div>

        <button
          onClick={recuperarSenha}
          type="button"
          className="btn btn-lg btn-block btn-enviar"
        >
          Recuperar Senha
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
