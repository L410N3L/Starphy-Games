//Documentacion!
//https://react-bootstrap.netlify.app/components/navbar/#navbars

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import logo from "../../Assets/logo_sin_fondo.png";
import "../Components.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../RegisterPage/AuthState";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  query,
  onSnapshot,
} from "firebase/firestore";
import firebase2 from "../../Home/Firebase2";
import { event } from "jquery";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(firebase2);
const user = auth.currentUser;

const Header = () => {
  const [cua, setcua] = useState(false);
  const [users, setusers] = useState([]);
  const [juegos, setjuegos] = useState([]);
  const [search, setsearch] = useState("");
  const [result, setresult] = useState("");

  const navigate = useNavigate();

  const filtrado = users.filter((x) => x.uid == cua);
  const Dev = filtrado.filter((x) => x.rol == "dev");
  console.log(filtrado);

  function a() {
    const ref = query(collection(db, "users"));

    onSnapshot(ref, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setusers(items);
    });
    console.log("hola");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const item = [];
        const uids = user.uid;
        item.push(uids);
        setcua(item);
      }
    });
  }

  function b() {
    const ref = query(collection(db, "games"));

    onSnapshot(ref, (querySnapshot) => {
      const juegodb = [];
      querySnapshot.forEach((doc) => {
        juegodb.push(doc.data());
      });

      setjuegos(juegodb);
    });
  }

  console.log(juegos);

  //barra de busqueda
  const SearchGames = (e) => {
    window.addEventListener("enter", e);
    setsearch(e.target.value);
    filterData(e.target.value);
  };
  console.log(result);

  console.log(search);
  const filterData = (search) => {
    var resultadosBusqueda = juegos.filter((x) => {
      if (x.juego.toString().toLowerCase().includes(search.toLowerCase())) {
        return x === true;
      }
    });
    if (search === "") {
      setresult([]);
    } else {
      setresult(resultadosBusqueda);
    }
  };

  useEffect(() => {
    a();
    b();
  }, []);

  return (
    <div className="xd">
      <Navbar expand="lg" className="header" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#" className="ayudaa">
            <Link to="/Home">
              <img
                src={logo}
                width="150"
                height="auto"
                className="d-inline-block align-top mx-auto ml-auto"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 md:w-full"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Explorar"
                menuVariant="dark"
                style={{ paddingRight: "20px",color: "white" }}
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

              <Button variant="outline-light" color="light" style={{border: "0"}}>Registra tu juego</Button>


              {/* Barra de busqueda */}
              <Form className="d-flex pl-5" style={{ width: "500px" }}>
                <FormControl
                  type="search"
                  placeholder="Que tienes ganas de jugar hoy?"
                  className="me-2"
                  aria-label="Search"
                  onChange={SearchGames}
                />
                <Link to={`/SearchPage/${search}`}>
                  <Button onKeyDown={SearchGames} variant="outline-light">
                    Search
                  </Button>
                </Link>
              </Form>
            </Nav>

            <Container style={{ justifyContent: "right" }}>
              <Row>
                <Col></Col>
                {cua ? (
                  <Col md={12} style={{ width: "200px" }}>
                    {filtrado.map((item) => (
                      <DropdownButton
                        onSubmit={a}
                        align="start"
                        type="button"
                        title={item.name}
                        key={item.uid}
                        id="dropdown-menu-align-start"
                        variant="outline-light"
                        style={{ border: "0", color: "white" }}
                      >
                        {Dev.map((item) =>
                          item.rol == "dev" ? (
                            <>
                              <Dropdown.Item eventKey="1">
                                <Link to="/EditDevProfile">
                                  Perfil desarrollador
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item eventKey="1">
                                <Link to="/Library">
                                  Tu biblioteca Como dev
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="4"
                                onClick={() => {
                                  signOut(auth)
                                    .then(() => {
                                      navigate("/Home");
                                      window.location.reload(false);
                                      // Sign-out successful.
                                    })
                                    .catch((error) => {
                                      // An error happened.
                                    });
                                }}
                              >
                                Salir
                              </Dropdown.Item>
                            </>
                          ) : (
                            <Dropdown.Item eventKey="3">
                              <Link to="/EditProfile">Tu perfil</Link>
                            </Dropdown.Item>
                          )
                        )}

                        <Dropdown.Item eventKey="3">
                          <Link to="/EditProfile">Tu perfil</Link>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          Libreria de juegos
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="4"
                          onClick={() => {
                            signOut(auth)
                              .then(() => {
                                navigate("/Home");
                                window.location.reload(false);
                                // Sign-out successful.
                              })
                              .catch((error) => {
                                // An error happened.
                              });
                          }}
                        >
                          Salir
                        </Dropdown.Item>
                      </DropdownButton>
                    ))}
                  </Col>
                ) : (
                  <>
                    <Col sm={6} md={1}>
                      <Link to="/register">
                        <Button
                          variant="outline-light"
                          style={{
                            float: "right",
                            border: "0",
                          }}
                        >
                          Registarse
                        </Button>
                      </Link>
                    </Col>
                    <Col sm={6} md={4}>
                      <Link to="/LoginUser">
                        <Button
                          variant="outline-light"
                          style={{
                            float: "right",
                            width: "100%",
                            textAlign: "center",
                            border: "0",
                          }}
                          className=""
                        >
                          Inicia Sesion
                        </Button>
                      </Link>
                    </Col>
                  </>
                )}
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
