import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./RadioPlayer.css";
import Navbar from "./Navbar";

const RadioPlayer = () => {
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const fetchCountriesAndLanguages = async () => {
      try {
        const countryResponse = await axios.get(
          "https://de1.api.radio-browser.info/json/countries"
        );
        const languageResponse = await axios.get(
          "https://de1.api.radio-browser.info/json/languages"
        );
        setCountries(
          countryResponse.data.map((country) => ({
            value: country.name,
            label: country.name,
          }))
        );
        setLanguages(
          languageResponse.data.map((language) => ({
            value: language.name,
            label: language.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries or languages", error);
      }
    };

    fetchCountriesAndLanguages();
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      if (selectedCountry && selectedLanguage) {
        try {
          const response = await axios.get(
            "https://de1.api.radio-browser.info/json/stations/search",
            {
              params: {
                country: selectedCountry.value,
                language: selectedLanguage.value,
              },
            }
          );
          setStations(response.data);
        } catch (error) {
          console.error("Error fetching stations", error);
        }
      }
    };

    fetchStations();
  }, [selectedCountry, selectedLanguage]);

  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="wr">
    <div className="radio-container">
      
      <div className="spacer"></div> {/* Spacer to adjust layout under Navbar */}
      {/* <h1 className="title">Radio Stations</h1> */}
      <div className="radio-content">
        <div className="selection-panel">
          <Select
            className="country-select"
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countries}
            placeholder="Select a country"
            isSearchable
          />

          <Select
            className="language-select"
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            options={languages}
            placeholder="Select a language"
            isSearchable
          />

          {selectedStation && (
            <div className="station-player">
              <h2 className="station-name">{selectedStation.name}</h2>
              <audio id="radio-audio" controls autoPlay key={selectedStation.url}>
                <source src={selectedStation.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        <div className="stations-panel">
          <ul className="stations-list">
            {stations.length > 0 ? (
              stations.map((station) => (
                <li
                  key={station.id}
                  className={`station-item ${
                    selectedStation && selectedStation.id === station.id
                      ? "active-station"
                      : ""
                  }`}
                  onClick={() => handleStationClick(station)}
                >
                  <a href="#" className="station-link">
                    {station.name}
                  </a>
                </li>
              ))
            ) : (
              <li className="station-item">No stations available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RadioPlayer;
