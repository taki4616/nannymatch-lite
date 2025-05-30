import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    setUserProfiles(stored);
  }, []);

  const handleClearProfiles = () => {
    const confirm = window.confirm("Are you sure you want to delete ALL user-created profiles?");
    if (confirm) {
      localStorage.removeItem("userProfiles");
      setUserProfiles([]);
    }
  };

  // Applications: families who received an application
  const applications = userProfiles.filter((profile) =>
    localStorage.getItem(`application-${profile.id}`)
  );
  
  return (
    <div className="admin-panel">
      <button onClick={() => navigate(-1)} className="expand-btn" style={{ marginBottom: "1rem" }}>
  ⬅ Back
      </button>
      <h2>Admin Dashboard</h2>
      <p>Total user-created profiles: {userProfiles.length}</p>

      <h3>Applications</h3>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <ul>
          {applications.map((family) => {
            const applicantId = localStorage.getItem(`application-${family.id}`);
            const applicant = userProfiles.find(
              (u) => u.id.toString() === applicantId
            );

            return (
              <li
                key={family.id}
                style={{
                  background: "#f3f4f6",
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <strong>{applicant?.name || "Unknown Nanny"}</strong> applied to{" "}
                <strong>{family.name}</strong>
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={handleClearProfiles} className="clear-btn">
        Clear All Profiles
      </button>

      <div className="card-grid">
        {userProfiles.map((profile) => (
          <div key={profile.id} className="card">
            <h3>{profile.name}</h3>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Rate:</strong> {profile.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
