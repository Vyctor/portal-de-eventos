import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
import { useSelector } from "react-redux";
import "./evento-detalhes.css";

// Components
import Navbar from "../../components/navbar";

const EventoDetalhes = (props) => {
  const [evento, setEvento] = useState();
  const [imagemUrl, setImagemUrl] = useState();
  const [carregando, setCarregando] = useState(1);

  const usuarioLogado = useSelector((state) => state.usuarioEmail);

  useEffect(() => {
    firebase
      .firestore()
      .collection("eventos")
      .doc(props.match.params.id)
      .get()
      .then((doc) => {
        setEvento(doc.data());
        doc.ref.update({ visualizacoes: doc.data().visualizacoes + 1 });
        firebase
          .storage()
          .ref(doc.data().foto)
          .getDownloadURL()
          .then((url) => setImagemUrl(url));
      })
      .finally(() => {
        setTimeout(() => {
          setCarregando(0);
        }, 1000);
      });
  }, [props.match.params.id]);

  console.log("Evento: ", evento);

  return (
    <>
      <Navbar />
      {evento ? (
        <div className="container-fluid">
          {carregando ? (
            <div className="row mt-5">
              <div
                hidden={!carregando}
                className="spinner-border text-danger mx-auto my-auto"
                role="status"
              ></div>
            </div>
          ) : (
            <div>
              <div className="row mx-auto">
                <img
                  src={
                    imagemUrl
                      ? imagemUrl
                      : "https://via.placeholder.com/1000x400"
                  }
                  className="img-banner"
                  alt="Banner do evento"
                />
                <div className="col-12 text-right visualizacoes">
                  <i className="fa fa-eye pr-2"></i>
                  <span>{evento.visualizacoes + 1}</span>
                </div>
                <h3 className="mx-auto titulo"> {evento.titulo}</h3>
              </div>

              <div className="row justify-content-around">
                <div className="col-md-3 col-sm-12 box-info p-3 d-flex align-items-center flex-column">
                  <i className="fas fa-ticket-alt fa-2x"></i>
                  <h5>
                    <strong>Tipo:</strong>
                  </h5>
                  <span className="mt-3">{evento.tipo}</span>
                </div>

                <div className="col-md-3 col-sm-12 box-info p-3 d-flex align-items-center flex-column">
                  <i className="fas fa-calendar-alt fa-2x"></i>
                  <h5>
                    <strong>Data:</strong>
                  </h5>
                  <span className="mt-3">{evento.data}</span>
                </div>
              </div>

              <div className="row box-detalhes mt-5">
                <div className="col-12 text-center">
                  <h5>
                    <strong>Detalhes do Evento</strong>
                  </h5>
                </div>
                <div className="col-12 text-center">
                  <p>{evento.detalhes}</p>
                </div>
              </div>

              {usuarioLogado === evento.usuarioEmail ? (
                <Link to="/" className="btn-editar">
                  <i className="fas fa-pen-square fa-3x"></i>
                </Link>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default EventoDetalhes;
