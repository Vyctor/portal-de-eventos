import React from "react";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "firebase/auth";

import "./navbar.css";

const Navbar = () => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((success) => {
        dispatch({ type: "LOG_OUT" });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg">
      <i className="far fa-smile-wink text-white fa-2x"></i>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link ml-2">
              Home
            </Link>
          </li>
          {useSelector((state) => state.usuarioLogado > 0) ? (
            <>
              <li className="nav-item">
                <Link to="evento-cadastro" className="nav-link">
                  Publicar Evento
                </Link>
              </li>
              <li className="nav-item">
                <Link to="create-account" className="nav-link">
                  Meus eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={signOut} className="nav-link">
                  Sair
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="create-account" className="nav-link">
                  Cadastrar
                </Link>
              </li>
              <li className="nav-item">
                <Link to="login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="reset-password" className="nav-link">
                  Recuperar senha
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
