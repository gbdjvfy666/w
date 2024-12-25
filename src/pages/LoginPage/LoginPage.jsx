import React, { useState } from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      dispatch(setUser({ email: user.email, uid: user.uid }));
      console.log('Пользователь вошёл:', user);

      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Ошибка входа. Проверьте email и пароль.');
    }
  };

  return (
    <div className="visual">
      <h2 className="text">Вход</h2>
      <div className="login-container">
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
