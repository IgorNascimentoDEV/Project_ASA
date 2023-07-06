import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import StoreContext from "./contexts/context";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return <Home/>  
}

export default App;
