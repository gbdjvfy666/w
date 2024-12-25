import React, { useState } from 'react';
import './index.css';

export const ChatPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleChat = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`chat-block ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleChat}>
        {isCollapsed ? '=>' : 'Свернуть'}
      </button>
      {!isCollapsed && <div className="chat-content">Здесь будет чат</div>}
    </div>
  );
};
