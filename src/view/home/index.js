import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import Navbar from "../../components/navbar";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <h1>{useSelector((state) => state.usuarioEmail)}</h1>
      <h1>Logado: {useSelector((state) => state.usuarioLogado)}</h1>
    </>
  );
};

export default Home;
