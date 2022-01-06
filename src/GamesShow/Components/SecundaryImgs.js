import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GamesCarousel from "./GamesCarousel";
import Payment from "../../Payment/Payment";
import Mojang from "../../Assets/Mojang.png";
import logoMinecraft from "../../Assets/1000.png";
import "../GamesShow.css";
import { useParams } from "react-router-dom";
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

const SecundaryImgs = () => {
  const { id } = useParams();
  const [game, setGame] = useState([]);

  const filtrado = game.filter((x) => x.esunjuego == "si");

  const filtrado2 = filtrado.filter((x) => x.juego == id);

  function getGames() {
    const ref = query(collection(db, "games"));

    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data(), id);
      });
      setGame(items);
    });
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div>
      <Container className="GamesInfo">
        {filtrado2.map((item) => (
          <Row>
            <Col md={7}>
              <GamesCarousel />

              <h6>Aventura | Construccion | Mundo abierto </h6>
              <Row className="pt-3">
                <img
                  src={Mojang}
                  style={{ width: "90px", borderRadius: "15%", align: "left" }}
                ></img>
                <h3>{item.juego}</h3>
              </Row>
            </Col>
            <Col md={5}>
              <Col style={{ backgroundColor: "#1f1f1f", borderRadius: "10px" }}>
                <Row>
                  <img
                    src={item.imagen}
                    style={{ width: "100%", heigth: "auto" }}
                  />
                  <div class="GamesPayment">
                    <h4>{item.precio}</h4>

                    {/* pilas que en el href va a el redireccionamiento */}
                    <Button
                      variant="light"
                      size="lg"
                      style={{ width: "100%" }}
                      href="/payment"
                    >
                      Comprar ahora
                    </Button>
                    <h5
                      style={{ textAlign: "center", color: "lightgreen" }}
                      className="pt-3"
                    >
                      Tu ordenador puede jugarlo
                    </h5>
                  </div>
                </Row>
              </Col>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default SecundaryImgs;
