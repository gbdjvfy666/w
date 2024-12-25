import React, { useState } from "react";
import { useAuth } from "hooks/use-auth";
import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./index.css";
import { LogoutButton } from "components/Logout/Logout";

export const ProfilePage = () => {
  const auth = getAuth();
  const storage = getStorage();
  const { email } = useAuth(); 
  const [nickname, setNickname] = useState(auth.currentUser?.displayName || "");
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState(auth.currentUser?.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true);
    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        setError("Ошибка при загрузке аватарки: " + err.message);
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setAvatar(downloadURL);
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        setSuccess("Аватарка успешно обновлена!");
        setLoading(false);
      }
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (newEmail && newEmail !== email) {
        await updateEmail(auth.currentUser, newEmail);
      }

      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      if (nickname && nickname !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: nickname });
      }

      setSuccess("Данные успешно обновлены!");
    } catch (err) {
      setError("Произошла ошибка при обновлении данных: " + err.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="avatar-container">
        {avatar ? (
          <img src={avatar} alt="avatar" className="avatar-preview" />
        ) : (
          <div className="avatar-placeholder">+</div>
        )}
        <input type="file" onChange={handleAvatarChange} className="avatar-upload" />
      </div>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Никнейм:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Введите ваш никнейм"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Введите новый email"
          />
        </div>
        <div className="form-group">
          <label>Новый пароль:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Введите новый пароль"
          />
        </div>
        <button type="submit" className="save-button">Сохранить изменения</button>
        <LogoutButton />
      </form>
    </div>
  );
};
