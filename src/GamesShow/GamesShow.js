import React from "react";
import Header from "../Components/Nav/Header";
import Slider from "./GamesSlider";
import logoMinecraft from "../Assets/1000.png";
import { Container, Row, Col, roundedCircle } from "react-bootstrap";
import "./GamesShow.css";
<<<<<<< HEAD
import Mojang from "../Assets/Mojang.png"
import GamesCarousel from "./GamesCarousel"
import Payment from "./Payment"
import Estrellita from "../Assets/Star.png" 
=======
import Mojang from "../Assets/Mojang.png";
import GamesCarousel from "./GamesCarousel";
import Payment from "./Payment";
>>>>>>> 0458b79aa7ce8c22160ee9c16f86f1e0c4cc4008

function GamesShow() {
  return (
    <>
      <Container>
        <Header></Header>
        <div className="pt-4">
          <Slider></Slider>
        </div>
      </Container>
      <Container>
        <Row>
          <Col
            sm={12}
            md={4}
            className="GamesShow"
            style={{
              position: "absolute",
              paddingLeft: "100px",
              paddingTop: "20vh",
              zIndex: "2",
              color: "white",
              align: "center",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <img
              src={logoMinecraft}
              style={{ width: "100%", heigth: "auto" }}
            />
            <p>
              descripcion pedorra jijijijaja descripcion pedorradescripcion
              pedorradescripcion pedorradescripcion pedorradescripcion
              pedorradescripcion pedorradescripcion pedorra
            </p>
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
      <Container style={{ paddingTop: "85vh", color: "white" }}>
        <Row>
          <Col md={7}>
            <GamesCarousel />
            <h6>Aventura | Construccion | Mundo abierto </h6>
            <Row className="pt-3">
<<<<<<< HEAD
              <img src={Mojang} style={{width: "90px", borderRadius: "15%", align: "left"}}></img>
              <h3>Fornite</h3>    
            </Row>
          </Col>
          <Col >
            <Container style={{backgroundColor: "#1f1f1f", borderRadius: "10px"}}>
            <img src={logoMinecraft} style={{width: "100%",heigth: "auto",}}/>
            <h5>Gratis csm</h5>
            <Payment></Payment>
            <hr></hr>
            <h1>5.0</h1>
            <img src={Estrellita} style={{float: "right"}}></img>
            <img src={Estrellita} style={{float: "right"}}></img>
            <img src={Estrellita} style={{float: "right"}}></img>
            <img src={Estrellita} style={{float: "right"}}></img>
            <img src={Estrellita} style={{float: "right"}}></img>
=======
              <img
                src={Mojang}
                style={{ width: "90px", borderRadius: "15%" }}
              ></img>
              <p>Fornite</p>
            </Row>
          </Col>
          <Col>
            <Container
              style={{ backgroundColor: "#1f1f1f", borderRadius: "10px" }}
            >
              <img
                src={logoMinecraft}
                style={{ width: "100%", heigth: "auto" }}
              />
              <h5>Gratis csm</h5>
              <Payment></Payment>
              <h1>⭐⭐⭐⭐</h1>
>>>>>>> 0458b79aa7ce8c22160ee9c16f86f1e0c4cc4008
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GamesShow;
