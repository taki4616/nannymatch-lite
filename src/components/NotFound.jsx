import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <img
        src="https://via.placeholder.com/150?text=Dotty+is+lost"
        alt="Dotty the Gecko looking confused"
        className="profile-photo"
      />

      <h2>🚫 404 – This Isn’t the Page You’re Looking For</h2>
      <p>Even Dotty couldn’t find this one. Let’s head back.👀🦎🤷🏾‍♀️</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;
