import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import addPlacesbtn from "./addPlacesbtn.png";
import logo from "./Components/logos.png";
import pin4 from "./pin4.png";
import pin5 from "./pin5.png";
import pin3 from "./pin3.png";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const Homes = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const mapRef = useRef(null); // Ref to store map instance
  const { isLoggedIn, userName, logout } = useAuth(); // Get login status and username from context

  const handleRadioClick = () => {
    if (isLoggedIn) {
      navigate("/radio");
    } else {
      navigate("/login");
    }
  };

  const handleAddPlacesClick = () => {
    if (isLoggedIn) {
      navigate("/RescueForm");
    } else {
      navigate("/login");
    }
  };

  const handleMarkerClick = useCallback(
    (name) => {
      if (isLoggedIn) {
        navigate(`/locinfo/${name}`);
      } else {
        navigate("/login");
      }
    },
    [isLoggedIn, navigate]
  );

  const cleanCoordinate = (coord) => {
    // Check if coord is a valid string before cleaning
    if (typeof coord === "string") {
      // Remove any non-numeric characters except for period and minus sign
      let cleanedCoord = coord.replace(/[^\d.-]/g, "");
  
      // Check if there is no decimal point and the length is more than 4 (likely missing a decimal)
      if (!cleanedCoord.includes('.') && cleanedCoord.length > 4) {
        // Insert a decimal after the first two digits (assuming degrees)
        cleanedCoord = cleanedCoord.slice(0, 2) + '.' + cleanedCoord.slice(2);
      }
  
      return parseFloat(cleanedCoord);
    }
    // Return NaN if coord is not a valid string
    return NaN;
  };
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/forms");
        console.log("API response:", response.data); // Log the response data to inspect its structure
        if (Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setLocations([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching locations", error);
        setLocations([]); // Set to an empty array in case of an error
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([12.9716, 77.5946], 5); // Center map on Bangalore with zoom level 5

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });
    }

    const customIcon4 = L.icon({
      iconUrl: pin4,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const customIcon5 = L.icon({
      iconUrl: pin5,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const customIcon3 = L.icon({
      iconUrl: pin3,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    if (Array.isArray(locations)) {
      locations.forEach((location) => {
        let { latitude, longitude, name, severity } = location;

        // Clean and validate latitude and longitude
        latitude = cleanCoordinate(latitude);
        longitude = cleanCoordinate(longitude);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const icon =
            severity === "Low"
              ? customIcon5
              : severity === "Medium"
              ? customIcon4
              : customIcon3;

          L.marker([latitude, longitude], { icon })
            .addTo(mapRef.current)
            .bindPopup(name)
            .on("click", () => handleMarkerClick(name));
        } else {
          console.error("Invalid coordinates", location);
        }
      });
    } else {
      console.error("Locations is not an array:", locations);
    }
  }, [locations, handleMarkerClick]);

  return (
    <div className="responsive-map">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <div className="home-button">
          {isLoggedIn ? (
            <>
              <span
                style={{
                  fontStyle: "oblique",
                  fontFamily: "unset",
                  fontSize: "20px",
                }}
              >
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img
                  src={require("./Components/hradio.png")}
                  alt="Radio"
                  className="radio-image"
                  onClick={handleRadioClick}
                />{" "}
                <div>Welcome, {userName}</div>
                </div>
              </span>
              <Link to="/about" className="home-link">
                ABOUT
              </Link>
              <button
                onClick={logout}
                style={{ fontWeight: "bolder", fontSize: "large" }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <img
                  src={require("./Components/hradio.png")}
                  alt="Radio"
                  className="radio-image"
                  onClick={handleRadioClick}
                />{" "}
              <Link to="/login" className="home-link">
                LOGIN
              </Link>
              <Link to="/signup" className="home-link">
                SIGNUP
              </Link>
              <Link to="/about" className="home-link">
                ABOUT
              </Link>
            </>
          )}
        </div>
      </nav>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <div>
        <div className="add-places-container">

          <img
            src={addPlacesbtn}
            alt="Add Places"
            className="add-places-btn"
            onClick={handleAddPlacesClick}
          />
        </div>
      </div>
      <div
        className="iframe-container"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <iframe
          width="100"
          height="100"
          src="https://www.youtube.com/embed/9M02G5c6x6w"
          title="🔴LIVE"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Homes;
