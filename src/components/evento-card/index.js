import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";

import "./evento-card.css";

const EventoCard = ({ id, img, titulo, detalhes, visualizacoes }) => {
  const [urlImagem, setUrlImagem] = useState();

  useEffect(() => {
    async function getImagemEvento() {
      await firebase
        .storage()
        .ref(img)
        .getDownloadURL()
        .then((url) => {
          setUrlImagem(url);
        });
    }
    getImagemEvento();
  }, [img]);

  return (
    <div className="col-md-3 col-sm-12">
      <img
        src={urlImagem ? urlImagem : "https://via.placeholder.com/150"}
        className="card-img-top img-cartao"
        alt="Imagem do Evento"
      />
      <div className="card-body">
        <h5>{titulo}</h5>
        <p className="card-text text-justify">{detalhes}</p>

        <div className="row rodape-card d-flex align-items-center">
          <div className="col-6">
            <Link
              to={`evento-detalhes/${id}`}
              className="btn btn-sm btn-detalhes"
            >
              + detalhes
            </Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye">
              <span className="pl-2">{visualizacoes}</span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoCard;
