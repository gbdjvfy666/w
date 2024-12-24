import React, { useState } from 'react';
import './index.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
    } catch (error) {
      setError('Ошибка входа. Проверьте логин и пароль.');
    }
  };

  return (
    <div className='visual'>
      <div className="login-container">
      <h2 className='text'>Вход</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            required
          />
        </div>

        <button type="submit" className="submit-button">Войти</button>
      </form>
    </div>
    </div>
    
  );
};
