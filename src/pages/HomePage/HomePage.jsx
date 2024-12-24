import { Navigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export const HomePage = () => {
  return (
    <div className="header">
    <div className="text">FedoChat</div>
    <div className="buttons">
      <Link to="/register">
        <button className="button">Регистрация</button>
      </Link>
      <Link to="/login">
        <button className="button">Вход</button>
      </Link>
    </div>
  </div>
  );
};
