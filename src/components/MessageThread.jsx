import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MessageThread() {
  const { familyId } = useParams();
  const currentUserId = localStorage.getItem("currentUser");

  const [familyProfile, setFamilyProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const threadKey = `messages-${familyId}-${currentUserId}`;

  useEffect(() => {
    // Load family profile
    const allProfiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    const fam = allProfiles.find((p) => p.id.toString() === familyId);
    setFamilyProfile(fam);

    // Load messages
    const storedMessages = JSON.parse(localStorage.getItem(threadKey) || "[]");
    setMessages(storedMessages);
  }, [familyId, threadKey]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        sender: currentUserId,
        text: newMessage,
        timestamp: Date.now()
      }
    ];

    setMessages(updatedMessages);
    localStorage.setItem(threadKey, JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  return (
    <div className="form-container">
      <h2>Chat with {familyProfile?.name || "Family"}</h2>

      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((msg, i) => {
          const isMine = msg.sender === currentUserId;
          return (
            <div
              key={i}
              style={{
                textAlign: isMine ? "right" : "left",
                marginBottom: "12px"
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: isMine ? "#f97316" : "#e5e7eb",
                  color: isMine ? "white" : "black",
                  padding: "10px",
                  borderRadius: "12px",
                  maxWidth: "75%"
                }}
              >
                <div style={{ fontSize: "0.9rem" }}>{msg.text}</div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    marginTop: "4px",
                    opacity: 0.7
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <textarea
        rows="3"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageThread;
