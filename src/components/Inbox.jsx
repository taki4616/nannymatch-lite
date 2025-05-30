import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const currentId = localStorage.getItem("currentUser");
    const storedProfiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    const current = storedProfiles.find((p) => p.id.toString() === currentId);

    if (!current) {
      alert("No current user found. Please log in or create a profile.");
      return;
    }

    setCurrentUser(current);

    const msgs = JSON.parse(localStorage.getItem("messages") || "[]");

    // Group messages by the other person in the conversation
    const threads = {};

    msgs.forEach((msg) => {
      if (msg.senderId === current.id || msg.receiverId === current.id) {
        const otherId = msg.senderId === current.id ? msg.receiverId : msg.senderId;
        if (!threads[otherId]) {
          threads[otherId] = [];
        }
        threads[otherId].push(msg);
      }
    });

    // Convert to array with preview of latest message
    const previews = Object.keys(threads).map((otherId) => {
      const messageList = threads[otherId];
      const lastMessage = messageList[messageList.length - 1];
      const otherProfile = storedProfiles.find((p) => p.id.toString() === otherId);
      return {
        otherId,
        name: otherProfile?.name || "Unknown",
        lastMessage: lastMessage.text,
        lastTime: lastMessage.timestamp
      };
    });

    setConversations(previews);
  }, []);

  const handleOpenThread = (otherId) => {
    navigate(`/messages/${currentUser.id}-${otherId}`);
  };

  if (!currentUser) return null;

  return (
    <div className="admin-panel">
      <button onClick={() => navigate(-1)} className="expand-btn" style={{ marginBottom: "1rem" }}>
        ⬅ Back
      </button>
      <h2>{currentUser.name}'s Inbox</h2>

      {conversations.length === 0 ? (
        <p>You have no conversations yet.</p>
      ) : (
        <ul>
          {conversations.map((c) => (
            <li key={c.otherId} style={{ marginBottom: "12px" }}>
              <strong>{c.name}</strong><br />
              <em>{c.lastMessage}</em><br />
              <small>{new Date(c.lastTime).toLocaleString()}</small><br />
              <button onClick={() => handleOpenThread(c.otherId)} className="expand-btn">
                View Conversation
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inbox;
