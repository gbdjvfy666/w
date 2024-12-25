import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import RegistrationForm from 'pages/RegisterPage/RegisterPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import PrivateRoute from 'PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
