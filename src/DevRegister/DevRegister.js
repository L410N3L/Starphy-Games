import React, { useState } from "react";
import { Form, Container, Button, Alert, Toast } from "react-bootstrap";
import "../RegisterPage/notify.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import firebase2 from "../Home/Firebase2";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0aytR2kq9oV6_9DdeTLs2nGlQTzOxDAE",
  authDomain: "usuarios-b78e1.firebaseapp.com",
  projectId: "usuarios-b78e1",
  storageBucket: "usuarios-b78e1.appspot.com",
  messagingSenderId: "779291947290",
  appId: "1:779291947290:web:9bed27d795c7d614183ca3",
  measurementId: "${config.measurementId}",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);
export default function DevRegister() {
  const auth = getAuth(app);

  toast.configure();
  let urlDescargar;

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");

  async function fileHandler(e) {
    const archivolocal = e.target.files[0];

    const archivoRef = ref(storage, `imagenesProfile/${archivolocal.name}`);

    await uploadBytes(archivoRef, archivolocal);

    urlDescargar = await getDownloadURL(archivoRef);
    console.log(urlDescargar);
  }

  async function RegisterDev(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();

    createUserWithEmailAndPassword(auth, emailReg, passwordReg, urlDescargar)
      .then((userCredential) => {
        addDoc(collection(db, "users"), {
          name: usernameReg,
          email: emailReg,
          pass: passwordReg,
          uid: auth.currentUser.uid,
          rol: "dev",
          photoProfile: urlDescargar,
        });
        toast.info("Verifique su correo electronico", {
          icon: "📨",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "dark-toast",
        });
        // Signed in
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!

          onAuthStateChanged(auth, (user) => {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            /* navigate("/loginUser"); */
            // ...
          });
        });
        const user = userCredential.emailReg;

        // ...
        console.log("si claro");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("no sory");
        toast.error("Ya existe esa cuenta", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

          className: "dark-toast",
        });
      });
    setValidated(true);
  }
  const updateUsername = function (event) {
    setUsernameReg(event.target.value);
  };
  const updateEmail = function (event) {
    setEmailReg(event.target.value);
  };
  const updatePassword = function (event) {
    setPasswordReg(event.target.value);
  };

  return (
    <>
      <div className="main-container">
        <div className="main">
          <h1>Bienvenido a Starphy</h1>
          <hr
            style={{
              color: "white",
              width: "50%",
              margin: "auto",
              marginTop: "15px",
            }}
          ></hr>{" "}
          <Form
            noValidate
            validated={validated}
            onSubmit={RegisterDev}
            className="form-container needs-validation"
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="ms-3 mt-3" style={{ color: "#E5E5E5" }}>
                Registra tu desarrolladora
              </Form.Label>{" "}
              <Form.Control
                className="p-3"
                required
                type="name"
                value={usernameReg}
                onChange={updateUsername}
                placeholder="Tambien puedes escirbir tu nombre"
                style={{ backgroundColor: "#C4C4C4" }}
              />
              <Form.Control.Feedback type="invalid">
                Escribe un nickname
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="ms-3 mt-3" style={{ color: "#E5E5E5" }}>
                Email
              </Form.Label>{" "}
              <Form.Control
                className="p-3"
                type="email"
                value={emailReg}
                onChange={updateEmail}
                placeholder="Ingresa tu email"
                style={{ backgroundColor: "#C4C4C4" }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email incorrecto
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="form-label">
                <Form.Label className="ms-3 mb-0" style={{ color: "#E5E5E5" }}>
                  Contraseña
                </Form.Label>
              </div>
              <div style={{ position: "relative" }}>
                <button
                  id="show-hide-passwd"
                  type="button"
                  className="btn-icon"
                  style={{ width: "57px" }}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <img className="eye-icon" />
                </button>

                <Form.Control
                  className="p-3"
                  type={show ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  style={{ backgroundColor: "#C4C4C4" }}
                  minLength={6}
                  onChange={updatePassword}
                  value={passwordReg}
                  maxLength={30}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Minimo 6 caracteres
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "#E5E5E5" }} className="pl-3">
                Selecciona la foto de tu desarrolladora
              </Form.Label>
              <Form.Control type="file" onChange={fileHandler} />
            </Form.Group>
            <div className="d-grid my-5 ">
              <Button
                style={{ backgroundColor: "#69c0a1" }}
                type="submit"
                size="lg"
                id="ingreso"
                /* onClick={Register} */
              >
                Registrarse
              </Button>
              <ToastContainer limit={1} />
            </div>
          </Form>
          <p className="text-center text-light">
            ¿Ya tienes una cuenta como desarrollador?{" "}
            <button
              /*   onClick={() => {
                navigate("/loginUser");
              }} */
              className="createAccount"
            >
              <a
                style={{
                  background: "transparent",
                  fontWeight: "999",
                  color: "white",
                  textDecoration: "none",
                }}
                to="/crearcuenta"
              >
                {" "}
                Inicia sesión
              </a>
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
