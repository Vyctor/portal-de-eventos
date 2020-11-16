import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

import "./evento-cadastro.css";

// Components
import Navbar from "../../components/navbar";

// Estado

const EventoCadastro = () => {
  const history = useHistory();

  const [tipoMensagem, setTipoMensagem] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [foto, setFoto] = useState();
  const [loading, setLoading] = useState();

  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  const cadastrarEvento = async () => {
    setTipoMensagem(null);
    setLoading(true);

    await storage
      .ref(`imagens/${foto.name}`)
      .put(foto)
      .then(async (result) => {
        await db
          .collection("eventos")
          .add({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            usuarioEmail: usuarioEmail,
            visualizacoes: 0,
            foto: result.ref.fullPath,
            publico: 1,
            criacao: new Date(),
          })
          .then(() => {
            setTipoMensagem("Sucesso");
          })
          .catch((error) => {
            setTipoMensagem("Erro");
          })
          .finally(() => {
            setLoading(false);
            history.push("/");
          });
      });
  };

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
            <input
              onChange={(event) => setTitulo(event.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Tipo do evento:</label>
            <select
              onChange={(event) => setTipo(event.target.value)}
              className="form-control"
            >
              <option value="Festa">Festa</option>
              <option value="Teatro">Teatro</option>
              <option value="Show">Show</option>
              <option value="Evento">Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição do evento:</label>
            <textarea
              onChange={(event) => setDetalhes(event.target.value)}
              type="text"
              className="form-control"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input
              onChange={(event) => setData(event.target.value)}
              type="datetime-local"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Upload da Foto:</label>
            <input
              onChange={(event) => setFoto(event.target.files[0])}
              type="file"
              className="form-control p-1"
            />
          </div>

          <div className="row">
            {loading === true ? (
              <div
                hidden={!loading}
                className="spinner-border text-danger mx-auto mt-3 mb-5"
                role="status"
              >
                <span className="sr-only">Criando conta...</span>
              </div>
            ) : (
              <button
                onClick={cadastrarEvento}
                type="button"
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro mx-auto col-3"
              >
                Cadastrar Evento
              </button>
            )}
          </div>
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
