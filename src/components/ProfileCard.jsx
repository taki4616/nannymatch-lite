import React, { useState, useEffect } from "react";

function ProfileCard({ profile }) {
  const [interested, setInterested] = useState(false);
  const [applied, setApplied] = useState(() => {
    const saved = localStorage.getItem(`applied-${profile.id}`);
    return saved === "true";
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`interested-${profile.id}`);
    if (savedState) {
      setInterested(JSON.parse(savedState));
    }
  }, [profile.id]);

  const handleInterestedClick = () => {
    const newState = !interested;
    setInterested(newState);
    localStorage.setItem(`interested-${profile.id}`, JSON.stringify(newState));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleApply = () => {
    const currentUserId = localStorage.getItem("currentUser");
    if (!currentUserId) {
      alert("No current user found. Please create a nanny profile first.");
      return;
    }

    setApplied(true);
    localStorage.setItem(`applied-${profile.id}`, "true");
    localStorage.setItem(`application-${profile.id}`, currentUserId);
  };

  const DEFAULT_IMAGE = "https://via.placeholder.com/150";
  const [imageError, setImageError] = useState(false);

  const imageSrc = !imageError
    ? profile.image || DEFAULT_IMAGE
    : null;

  return (
    <div className="card">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={profile.name}
          className="profile-photo"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="profile-photo fallback-photo">No Image</div>
      )}

      <h2>{profile.name}</h2>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Experience:</strong> {profile.experience} years</p>
      <p><strong>Rate:</strong> {profile.rate}</p>
      <p><strong>Availability:</strong> {profile.availability}</p>
      <p className="bio-preview"><strong>Bio:</strong> {profile.bio}</p>

      <button
        className={interested ? "interested-btn active" : "interested-btn"}
        onClick={handleInterestedClick}
      >
        {interested ? "Marked as Interested ✅" : "Interested"}
      </button>

      {profile.role === "Family" && (
        <button
          className={`apply-btn ${applied ? "applied" : ""}`}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply Now"}
        </button>
      )}

      <button className="expand-btn" onClick={handleExpandClick}>
        {expanded ? "Hide Details" : "Show Details"}
      </button>

      {expanded && (
        <div className="additional-details">
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
