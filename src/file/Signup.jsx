import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import "./Style.css";
import tsp from "./Components/rescue.jpg";
const Signup = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { firstname, lastname, email, password, phoneNumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", user);
      navigate("/login");
    } catch (err) {
      console.error("Error registering user", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${tsp})`, // Corrected background image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
      }}
    >
      <Paper
        elevation={10}
        style={{
          width: "40%",
          maxWidth: "600px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px",
        }}
      >
        <center>
          <Typography style={{ fontSize: "40px", fontFamily: "initial" }}>
            Sign Up
          </Typography>
          <br />
          <form
            onSubmit={onSubmit}
            className="forms"
            style={{ marginTop: "10px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Firstname"
                name="firstname"
                type="text"
                variant="standard"
                placeholder="Enter firstname"
                style={{ width: "48%" }}
                value={firstname}
                onChange={onInputChange}
              />
              <TextField
                label="Lastname"
                name="lastname"
                type="text"
                variant="standard"
                placeholder="Enter lastname"
                style={{ width: "48%" }}
                value={lastname}
                onChange={onInputChange}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="standard"
                placeholder="Enter email"
                style={{ width: "80%" }}
                value={email}
                onChange={onInputChange}
              />
              <br />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                variant="standard"
                placeholder="Enter phone number"
                style={{ width: "80%" }}
                value={phoneNumber} // Bind phoneNumber to state
                onChange={onInputChange}
              />
              <br />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="standard"
                autoComplete="new-password"
                placeholder="Enter password"
                style={{ width: "80%" }}
                value={password}
                onChange={onInputChange}
              />
            </div>
            <br />
            <center>
              <Button
                type="submit"
                variant="contained"
                style={{ width: "100px" }}
              >
                Sign Up
              </Button>
            </center>
          </form>
          <br />
          <br />
          <Link
            to="/Login"
            style={{
              color: "darkblue",
              textDecoration: "none",
            }}
          >
            Already have an account?
          </Link>
        </center>
      </Paper>
    </div>
  );
};

export default Signup;
