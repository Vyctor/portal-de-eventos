import React, { useState } from "react";
import firebase from "../../config/firebase";
import "firebase/auth";

import "./create-account.css";

const CreateAccount = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [tipoMensagem, setTipoMensagem] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [spinnerState, setSpinnerState] = useState();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const cadastrar = () => {
    setTipoMensagem(null);

    if (!email || !password) {
      setTipoMensagem("Erro");
      setErrorMessage(
        "Você precisa informar o e-mail e a senha para realizar o cadastro!"
      );
      return;
    }

    setSpinnerState(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        setTipoMensagem("Sucesso");
      })
      .catch((error) => {
        setTipoMensagem("Erro");
        switch (error.message) {
          case "Password should be at least 6 characters":
            setErrorMessage("A senha deve ter pelo menos 6 caracteres!");
            break;
          case "The email address is already in use by another account.":
            setErrorMessage(
              "Este e-mail já está sendo utilizado por outro usuário"
            );
            break;
          case "The email address is badly formatted.":
            setErrorMessage("O formato do e-mail é inválido!");
            break;
          default:
            setErrorMessage(
              "Não foi possível cadastrar. Tente novamente mais tarde!"
            );
            break;
        }
      })
      .finally(() => {
        setSpinnerState(false);
        this.resetForm();
      });
  };

  return (
    <div className="form-cadastro">
      <form className="text-center form-login mx-auto mt-5">
        <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          className="form-control my-2"
          placeholder="E-mail"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="form-control my-2"
          placeholder="Senha"
        ></input>

        {spinnerState === true ? (
          <div
            hidden={!spinnerState}
            className="spinner-border text-danger"
            role="status"
          >
            <span className="sr-only">Criando conta...</span>
          </div>
        ) : (
          <button
            onClick={cadastrar}
            type="button"
            className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
          >
            Criar conta
          </button>
        )}

        <div className="msg-login text-center my-5">
          {tipoMensagem === "Sucesso" && (
            <span className="text-success">
              <strong>Isso aí!</strong> Usuário cadastrado com sucesso!
              &#128526;
            </span>
          )}
          {tipoMensagem === "Erro" && (
            <span className="text-danger">
              <strong>Ops!</strong> {errorMessage} &#128546;
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
