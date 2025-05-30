import React, { useEffect, useState } from "react";
import profiles from "../data/profiles";
import ProfileCard from "./ProfileCard";

function InterestedList() {
  const [interestedProfiles, setInterestedProfiles] = useState([]);

  useEffect(() => {
    const filtered = profiles.filter((profile) => {
      const saved = localStorage.getItem(`interested-${profile.id}`);
      return saved && JSON.parse(saved);
    });
    setInterestedProfiles(filtered);
  }, []);

  return (
    <div>
      {interestedProfiles.length > 0 ? (
        <div className="card-grid">
          {interestedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No profiles marked as Interested yet.</p>
      )}
    </div>
  );
}

export default InterestedList;
