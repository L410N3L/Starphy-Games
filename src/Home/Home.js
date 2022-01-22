import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import {
  query,
  collection,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import firebase2 from "../Home/Firebase2.js";

//importacion del header
import Header from "../Components/Nav/Header";
import CardStyle from "../Components/Cards/CardStyle";
import "./Home.css";

//importacion de las Cards
import SliderDelHome from "../Components/SliderDelHome";

//Slider de recomendaciones
import Recomendations1 from "./Recomendations1";

//Slider juegos compatibles y descargables
const db = getFirestore(firebase2);

const Home = () => {
  const [game, setGame] = useState([]);

  const filtros = game.filter((x) => x.esunjuego == "si");
  console.log(filtros);

  function getGames() {
    const ref = query(collection(db, "games"));

    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data(), doc.id);
      });
      console.log();
      setGame(items);
    });
  }
  useEffect(() => {
    getGames();
  }, []);
  return (
    <div>
      <Container>
        <Col>
          <Header />
        </Col>
      </Container>
      <Container>
        <SliderDelHome />
      </Container>
      <div style={{ paddingTop: "78vh" }}>
        {/*  <img src={Barrita}></img> */}
        <h1 style={{ color: "white" }}>Los mejores juegos para ti</h1>
      </div>
      <Recomendations1 />
      <h1>Juegos multijugador 👋</h1>
      <CardStyle />
    </div>
  );
};
export default Home;
