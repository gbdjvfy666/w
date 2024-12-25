import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/use-auth';
import './index.css';
import { ChatPage } from 'pages/ChatPage/ChatPage';

export const HomePage = () => {
  const { isAuth } = useAuth();

  return (
    <div className={`header ${isAuth ? 'header-auth' : ''}`}>
      <ChatPage />
      <div className={`text ${isAuth ? 'text-auth' : ''}`}>FedoChat</div>
      <div className="buttons">
        {isAuth ? (
          <Link to="/profile">
            <button className="button-profile">Профиль</button>
          </Link>
        ) : (
          <>
            <Link to="/register">
              <button className="button">Регистрация</button>
            </Link>
            <Link to="/login">
              <button className="button">Вход</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
