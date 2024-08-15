// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust the path as necessary

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ProceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${email}`
        );
        const user = response.data;

        if (!user) {
          toast.error("User not found");
        } else if (user.password === password) {
          toast.success("Login successful");
          login(email);
          navigate("/");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (err) {
        toast.error("Login failed due to: " + err.message);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (!email) {
      result = false;
      toast.warning("Please enter username");
    }
    if (!password) {
      result = false;
      toast.warning("Please enter password");
    }
    return result;
  };

  return (
    <Paper
      elevation={10}
      style={{
        width: "40%",
        maxWidth: "500px",
        height: "500px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <center>
        <Typography style={{ fontSize: "40px", fontFamily: "initial" }}>
          Login Page
        </Typography>
        <br />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "70%" }}
        />
        <br />
        <br />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          autoComplete="new-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "70%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{backgroundColor:"transparent"}}
                  
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <Checkbox color="primary" /> Remember me
        <br />
        <br />
        <Button
          variant="contained"
          onClick={ProceedLogin}
          style={{ width: "100px" }}
        >
          Login
        </Button>
        <br />
        <br />
        <br />
        <Link
          to="/signup"
          style={{
            color: "darkblue",
            textDecoration: "none",
          }}
        >
          {"Don't have an account?"}
        </Link>
        &emsp;&emsp;&emsp;
        <Link
          to="#"
          style={{
            color: "darkblue",
            textDecoration: "none",
          }}
        >
          {"Forgot password?"}
        </Link>
      </center>
      <ToastContainer />
    </Paper>
  );
};

export default Login;
