import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

import "./evento-cadastro.css";

// Components
import Navbar from "../../components/navbar";

const EventoCadastro = (props) => {
  // Estado
  const idEditando = props.match.params.id;

  const history = useHistory();

  const [tipoMensagem, setTipoMensagem] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [fotoNova, setFotoNova] = useState();
  const [loading, setLoading] = useState();
  const [carregando, setCarregando] = useState(1);

  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  useEffect(() => {
    const getEvento = async () => {
      await firebase
        .firestore()
        .collection("eventos")
        .doc(idEditando)
        .get()
        .then((doc) => {
          setTitulo(doc.data().titulo);
          setTipo(doc.data().tipo);
          setDetalhes(doc.data().detalhes);
          setData(doc.data().data);
          setFotoAtual(doc.data().foto);
        })
        .finally(() => {
          setTimeout(() => {
            setCarregando(0);
          }, 1000);
        });
    };

    if (idEditando) {
      getEvento();
    } else {
      setCarregando(0);
    }
  }, [idEditando]);

  const cadastrarEvento = async () => {
    setTipoMensagem(null);
    setLoading(true);

    await storage
      .ref(`imagens/${fotoNova.name}`)
      .put(fotoNova)
      .then(async (result) => {
        const doc = db.collection("eventos").doc();
        await doc
          .set({
            id: doc.id,
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            usuarioEmail: usuarioEmail,
            visualizacoes: 0,
            foto: fotoNova.name,
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

  const atualizarEvento = async () => {
    setTipoMensagem(null);
    setLoading(true);

    if (fotoNova) storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

    await db
      .collection("eventos")
      .doc(idEditando)
      .update({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        foto: fotoNova ? fotoNova.name : fotoAtual,
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
  };

  return (
    <>
      <Navbar></Navbar>

      {carregando ? (
        <div className="row mt-5">
          <div
            hidden={!carregando}
            className="spinner-border text-danger mx-auto my-auto"
            role="status"
          ></div>
        </div>
      ) : (
        <div className="col-12 mt-5">
          <div className="row">
            <h3 className="mx-auto font-weight-bold">
              {idEditando ? "Atualizar Evento" : "Novo Evento"}
            </h3>
          </div>

          <form className="mx-auto col-6">
            <div className="form-group">
              <label>Título:</label>
              <input
                onChange={(event) => setTitulo(event.target.value)}
                type="text"
                className="form-control"
                value={titulo && titulo}
              />
            </div>

            <div className="form-group">
              <label>Tipo do evento:</label>
              <select
                onChange={(event) => setTipo(event.target.value)}
                className="form-control"
                value={tipo && tipo}
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
                value={detalhes && detalhes}
              />
            </div>

            <div className="form-group">
              <label>Data:</label>
              <label>Data:</label>
              <input
                onChange={(event) => setData(event.target.value)}
                type="datetime-local"
                className="form-control"
                value={data && data}
              />
            </div>

            <div className="form-group">
              <label>
                Upload da Foto:{" "}
                {idEditando
                  ? "*caso queira manter a mesma foto, não atualize esse campo"
                  : ""}
              </label>
              <input
                onChange={(event) => setFotoNova(event.target.files[0])}
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
                  onClick={idEditando ? atualizarEvento : cadastrarEvento}
                  type="button"
                  className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro mx-auto col-3"
                >
                  {idEditando ? "Atualizar evento" : "Publicar Evento"}
                </button>
              )}
            </div>
          </form>

          <div className="msg-login text-center my-2">
            {tipoMensagem === "Sucesso" && (
              <span>
                <strong>Wow!</strong>{" "}
                {idEditando ? "Evendo atualizado!" : "Evento publicado!"}{" "}
                &#128526;
              </span>
            )}
            {tipoMensagem === "Erro" && (
              <span>
                <strong>Ops!</strong> Não foi possível
                {idEditando ? "atualizar" : "publicar"} o evento! &#128546;
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventoCadastro;
