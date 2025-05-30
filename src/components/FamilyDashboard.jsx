import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FamilyDashboard() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [currentFamily, setCurrentFamily] = useState(null);

  useEffect(() => {
    const currentId = localStorage.getItem("currentUser");
    const storedProfiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");

    const current = storedProfiles.find((p) => p.id.toString() === currentId && p.role === "Family");

    if (!current) {
      alert("No logged-in family found. Please create a family profile.");
      return;
    }

    setCurrentFamily(current);

    const appliedNannyId = localStorage.getItem(`application-${current.id}`);

    if (appliedNannyId) {
      const nannyProfile = storedProfiles.find((p) => p.id.toString() === appliedNannyId);
      if (nannyProfile) {
        setApplicants([nannyProfile]);
      }
    }
  }, []);

  const handleMessage = (nannyId) => {
    const familyId = currentFamily.id;
    navigate(`/messages/${familyId}-${nannyId}`);
  };

  if (!currentFamily) return null;

  return (
    <div className="admin-panel">
      <button onClick={() => navigate(-1)} className="expand-btn" style={{ marginBottom: "1rem" }}>
        ⬅ Back
      </button>
      <h2>Welcome, {currentFamily.name}</h2>
      <h3>Applicants</h3>

      {applicants.length === 0 ? (
        <p>No one has applied to your profile yet.</p>
      ) : (
        <ul>
          {applicants.map((nanny) => (
            <li key={nanny.id}>
              <strong>{nanny.name}</strong> has applied.
              <button
                className="expand-btn"
                onClick={() => handleMessage(nanny.id)}
                style={{ marginLeft: "10px" }}
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FamilyDashboard;
