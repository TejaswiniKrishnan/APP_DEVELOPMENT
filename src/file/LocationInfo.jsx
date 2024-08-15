import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";
import "./LocationInfo.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import floodImage from "./Components/floo.png";
import quakeImage from "./Components/quake.png";
import tsunamiImage from "./Components/tsuna.png";
import landImage from "./Components/land.jpg";

const disasterImages = {
  flood: floodImage,
  earthquake: quakeImage,
  tsunami: tsunamiImage,
  landslide: landImage,
};

const LocationInfo = () => {
  const { name } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/forms/${name}`
        );
        setLocationData(response.data);
      } catch (error) {
        setError("Failed to fetch location data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!locationData) {
    return <p>No data found for this location.</p>;
  }

  const {
    disasterType,
    district,
    rescueLocation,
    severity,
    peopleCount,
    pinCode,
    goods,
  } = locationData;

  const disasterImage =
    disasterImages[disasterType.toLowerCase()] || "default.png";

  return (
    <div
      className="iop"
      style={{
        backgroundImage: `url(${disasterImage})`,
        height: "750px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="location-info">
        <Navbar />
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h1>
                <FaMapMarkerAlt className="location-icon" /> Location Info:{" "}
                {district}
              </h1>
              <p>
                <strong>Type of disaster:</strong> {disasterType}
              </p>
              <p>
                <strong>Severity:</strong> {severity}
              </p>
              <p>
                <strong>Survivors:</strong> {peopleCount}
              </p>
              <p>
                <strong>Address:</strong> {rescueLocation},{pinCode}
              </p>
            </div>
            <div className="flip-card-back">
              <h2>
                <FaBoxOpen className="product-icon" /> EMERGENCY PRODUCTS:
              </h2>
              {goods && goods.length > 0 ? (
                <ul>
                  {goods.map((good, index) => (
                    <li key={index}>
                      <strong>{good.name}:</strong> {good.count}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No goods required</p>
              )}
              <div className="buttons">
                <Link to={`/products/${name}`}>
                  <button className="dons">Donate Goods</button>
                </Link>
                <Link to="/pay">
                  <button className="dons">Donate Cash</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
