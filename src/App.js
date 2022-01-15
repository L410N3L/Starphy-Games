import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//importacion del Home
import Home from "./Home/Home";

//importacion del Login

import Login from "./LoginPage/Login";
import Recuperar from "./LoginPage/Recover";
import CreatePass from "./LoginPage/CreatePassword.js";
import Register from "./RegisterPage/Register.js";
import Error404 from "./pages/Error404";
import GamesShow from "./GamesShow/GamesShow";
import CardStyle from "../src/Components/Cards/CardStyle";
import Payment from "../src/Payment/PayCheckout";
import DataIndex from "../src/DataIndex/DataIndex";
import Library from "./Library/Library";
import EditProfile from "./EditProfile/EditProfile";
import DevProfile from "../src/DevProfile/DevProfile";
import CardsBacanas from "../src/Components/CardsBacanas/CardsBacanas";
import DevRegister from "../src/DevRegister/DevRegister";

//importacion del bootstrap y del css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute, {
  AuthContextProvider,
  useAuthState,
} from "./Components/RutasPrivadas/PrivateRoutes";
import { useAuth } from "./RegisterPage/AuthState";
import { Redirect } from "wouter";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
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
function App() {
  const [id, setId] = useState(false);
  function prueba() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const item = [];
        const uids = user.uid;
        item.push(uids);
        setId(item);
      }
    });
  }

  useEffect(() => {
    prueba();
  }, []);
  return (
    <>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/GamesShow/:id" element={<GamesShow />} />
        {id && <Route path="/EditProfile" element={<EditProfile />} />}
        {id && <Route path="/library" element={<Library />} />}
        <Route path="/Home/" element={<Home />} />
        <Route path="/LoginUser" element={<Login />} />
        <Route path="/RecoverPassword" element={<Recuperar />} />
        <Route path="/CreatePassword" element={<CreatePass />} />
        <Route path="/register" element={<Register />} />r
        <Route path="/CardsBacanas" element={<CardsBacanas />} />
        <Route path="/Payment/:id" element={<Payment />} />
        <Route path="/DataIndex" element={<DataIndex />} />
        <Route path="/DevProfile" element={<DevProfile />} />
        <Route path="/DevRegister" element={<DevRegister />} />
      </Routes>
    </>
  );
}

// <Container className="loginContainer">
//   <Login />
// </Container>
export default App;
