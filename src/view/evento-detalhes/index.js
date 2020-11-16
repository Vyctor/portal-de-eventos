import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./evento-detalhes.css";

// Components
import Navbar from "../../components/navbar";

const EventoDetalhes = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row mx-auto">
          <img
            src={"https://via.placeholder.com/1000x400"}
            className="img-banner"
            alt="Banner do evento"
          />
        </div>

        <div className="row mt-2 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-info p-3 d-flex flex align-items-center flex-column my-2">
            <i className="fas fa-ticket-alt fa-2x"></i>
            <h5>
              <strong>Tipo:</strong>
            </h5>
            <span className="mt-3">Festa</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 d-flex flex align-items-center flex-column my-2">
            <i className="fas fa-calendar-alt fa-2x"></i>
            <h5>
              <strong>Data:</strong>
            </h5>
            <span className="mt-3">19/11/2020</span>
          </div>
        </div>

        <div className="col box-detalhes mt-5">
          <h5>
            <strong>Detalhes do Evento</strong>
          </h5>
          <p className="text-justify p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            temporibus ea rerum omnis explicabo quae nulla minus suscipit quis
            asperiores! Dolor a mollitia eligendi consectetur tempora asperiores
            nostrum ea delectus!
          </p>
        </div>

        <Link to="/" className="btn-editar">
          <i className="fas fa-pen-square fa-3x"></i>
        </Link>
      </div>
    </>
  );
};

export default EventoDetalhes;
