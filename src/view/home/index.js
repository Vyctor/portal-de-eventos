import React, { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";

// Components
import Navbar from "../../components/navbar";
import EventoCard from "../../components/evento-card";

const Home = ({ match }) => {
  const [eventos, setEventos] = useState({});
  const [pesquisa, setPesquisa] = useState("");
  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  useEffect(() => {
    let listaEventos = [];

    // criar função assíncrona
    async function carregaTodosEventos() {
      await firebase
        .firestore()
        .collection("eventos")
        .get()
        .then(async (data) => {
          await data.forEach((doc) => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaEventos.push({ id: doc.id, ...doc.data() });
            }
          });
          setEventos(listaEventos);
        });
    }

    async function carregaMeusEventos() {
      await firebase
        .firestore()
        .collection("eventos")
        .where("usuarioEmail", "==", usuarioEmail)
        .get()
        .then(async (data) => {
          await data.forEach((doc) => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaEventos.push({ id: doc.id, ...doc.data() });
            }
          });
          setEventos(listaEventos);
        });
    }

    if (match.params.parametro) {
      carregaMeusEventos();
    } else {
      carregaTodosEventos();
    }
  }, [match.params.parametro, pesquisa, usuarioEmail]);

  return (
    <>
      <Navbar></Navbar>

      <div className="row p-5 mx-auto col-6">
        <h2 className="text-center mx-auto pb-4">Eventos</h2>
        <input
          type="text"
          className="form-control input-pesquisa text-center"
          placeholder="Pesquise o evento pelo título..."
          onChange={(event) => {
            setPesquisa(event.target.value);
          }}
        />
      </div>

      <div className="row m-3">
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
