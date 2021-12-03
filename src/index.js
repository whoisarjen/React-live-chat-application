import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Login from './Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/chat" element={<App />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
