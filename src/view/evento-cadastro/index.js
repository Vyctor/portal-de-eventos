import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

import "./evento-cadastro.css";

// Components
import Navbar from "../../components/navbar";

const EventoCadastro = () => {
  const [tipoMensagem, setTipoMensagem] = useState();

  return (
    <>
      <Navbar></Navbar>

      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">Novo Evento</h3>
        </div>

        <form className="mx-auto col-6">
          <div className="form-group">
            <label>Título:</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Tipo do evento:</label>
            <select className="form-control">
              <option disabled selected value>
                -- Selecione um tipo --
              </option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição do evento:</label>
            <textarea type="text" className="form-control" rows="3" />
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input type="datetime-local" className="form-control" />
          </div>

          <div className="form-group">
            <label>Upload da Foto:</label>
            <input type="file" className="form-control p-1" />
          </div>

          <button
            type="button"
            className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
          >
            Cadastrar Evento
          </button>
        </form>

        <div className="msg-login text-center my-2">
          {tipoMensagem === "Sucesso" && (
            <span>
              <strong>Wow!</strong> Evento publicado! &#128526;
            </span>
          )}
          {tipoMensagem === "Erro" && (
            <span>
              <strong>Ops!</strong> Não foi possível publicar o evento!
              &#128546;
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default EventoCadastro;
