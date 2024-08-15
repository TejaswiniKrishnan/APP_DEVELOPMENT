// src/components/Card.js
import React from "react";

const Card = ({ ngo }) => {
  return (
    <div className="card">
      {ngo.image && (
        <img src={ngo.image} alt={ngo.name} className="card-image" />
      )}
      <div className="card-content">
        <h3 className="card-title">{ngo.name}</h3>
        <p className="card-address">Address: {ngo.address}</p>
        {ngo.phone && <p className="card-phone">Phone: {ngo.phone}</p>}
        {ngo.website && (
          <p className="card-website">
            Website:{" "}
            <a href={ngo.website} target="_blank" rel="noopener noreferrer">
              {ngo.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
