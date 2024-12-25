import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/userSlice';
import './index.css'

export const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return <button onClick={handleLogout} className='logout-button'>Выйти</button>;
};
