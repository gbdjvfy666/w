import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Заменяем useHistory на useNavigate
import './index.css';

const RegistrationForm = () => {
  const navigate = useNavigate(); // Новый способ маршрутизации
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Регистрация прошла успешно!');
      setEmail('');
      setPassword('');
      setError('');
      setTimeout(() => navigate('/'), 2000); // Перенаправляем на главную страницу через 2 секунды
    } catch (err) {
      setError('Ошибка: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div className="visual">
      <h2 className="text">Регистрация</h2>
      <form onSubmit={handleRegister} className="registration-form">
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

        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default RegistrationForm;
