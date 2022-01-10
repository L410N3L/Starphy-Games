import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button,Image } from "react-bootstrap";
import GamesCarousel from "./GamesCarousel";
import Payment from "../../Payment/Payment";
import Mojang from "../../Assets/Mojang.png";
import logoMinecraft from "../../Assets/1000.png";
import { Link } from "react-router-dom";
import "../GamesShow.css";
import { useParams } from "react-router-dom";
import firebase2 from "../../Home/Firebase2.js";
import Star from "../../Assets/Star.png";

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

              <h6>{item.categoria}</h6>
    
                <Image
                  src={Mojang}
                  style={{ width: "90px", align: "left" }}
                  rounded
                ></Image>
                <div style={{align:"rigth"}}>
                <h2 >Mojang</h2>
                <p>{item.descrip}</p>
                </div>
              
            </Col>
            <Col md={5}>
              <Col style={{ backgroundColor: "#1f1f1f", borderRadius: "10px" }}>
                <Row>
                  <img
                    src={item.imagen}
                    style={{ width: "100%", heigth: "auto", borderRadius: "20px 20px 0 0"}}
                  />
                  <div className="GamesPayment pt-4">
                    <h4>{item.precio}</h4>

                    <Link to={`/payment/${item.juego}`}>
                      <Button
                        variant="light"
                        size="lg"
                        style={{ width: "100%" }}
                      >
                        Comprar ahora
                      </Button>
                    </Link>
                    <h5
                      style={{ textAlign: "center", color: "lightgreen" }}
                      className="pt-4"
                    >
                      Tu ordenador puede jugarlo
                    </h5>
                    <hr></hr>
                    <Col>
                      <h2 style={{ float: "left" }}>5.0</h2>
                      <img src={Star} style={{ float: "right" }}></img>
                      <img src={Star} style={{ float: "right" }}></img>
                      <img src={Star} style={{ float: "right" }}></img>
                      <img src={Star} style={{ float: "right" }}></img>
                      <img src={Star} style={{ float: "right" }}></img>
                    </Col>
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
