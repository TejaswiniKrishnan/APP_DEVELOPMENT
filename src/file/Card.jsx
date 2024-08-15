import React from "react";

const Card = ({ ngo }) => {
  return (
    <div className="card">
      <img src={ngo.image} alt={ngo.name} />
      <div className="details">
        <h2>{ngo.name}</h2>
        <p>
          <strong>Address:</strong> {ngo.address}
        </p>
        <p>
          <strong>Phone Number:</strong> {ngo.phone}
        </p>
        {ngo.website && (
          <p>
            <strong>Website:</strong>{" "}
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
