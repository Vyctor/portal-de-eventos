import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

// Components
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";

const Home = () => {
  const [eventos, setEventos] = useState({});

  useEffect(() => {
    let listaEventos = [];

    // criar função assíncrona
    async function carregaEventos() {
      await firebase
        .firestore()
        .collection("eventos")
        .get()
        .then(async (data) => {
          await data.forEach((doc) => {
            listaEventos.push({ id: doc.id, ...doc.data() });
          });
          setEventos(listaEventos);
        });
    }

    carregaEventos();
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className="row p-3">
        {eventos.length > 0
          ? eventos.map((evento) => (
              <EventoCard
                key={evento.id}
                id={evento.id}
                img={evento.foto}
                titulo={evento.titulo}
                detalhes={evento.detalhes}
                visualizacoes={evento.visualizacoes}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
