//Documentacion!

//https://react-bootstrap.github.io/components/cards/

import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Creadores from "./PruebasApi.js";
//importacion de la imagen
import MinecraftImg from "../../Assets/MinecraftImg.jpg";
import "./CardEstilo.css";
import { initializeApp } from "firebase/app";
import { Carousel, Form, Row, Col } from "react-bootstrap";

import fortnite from "../../Components/Cards/fortnite.jpg";
import firebase2 from "../../Home/Firebase2.js";
import {
  query,
  collection,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(firebase2);

const TopGames = function (doc) {
  const [game, setGame] = useState([]);

  const limitGame = game.slice(0, 4);

  const filtros = game.filter((x) => x.esunjuego == "si");

  function getGames() {
    const ref = query(collection(db, "games"));

    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data(), doc.id);
      });
      setGame(items);
    });
   
  }

  useEffect(() => {
    getGames();
  }, []);
  //Usar filter
  if (game.juego >= 19) {
    const etesech =[];
    var gameName = game.juego 
    gameName.substr(0,19)
    etesech.push(gameName)
    console.log(gameName);
  }
  return (
    <>
      <Container>
        {filtros.map((item) => (
          <Container className="carousel5">
            <Row key={item.id}>
              <Col>
                <Card className="border-0" style={{ width: "100%" }}>
                  <Link to={`/GamesShow/${item.juego}`}>
                    <Card.Img
                      variant="top"
                      src={item.imagen}
                      className="img-fluid img-card"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <h4>{game.juego}</h4>
                      <h6>Mojang</h6>
                      <h6>{item.precio}</h6>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        ))}
      </Container>
    </>
  );
};

export default TopGames;
