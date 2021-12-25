import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forget() {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");

  const handleMail = (event) => {
    setMail(event.target.value);
  };
  const handleReset = () => {
    axios
      .post("http://localhost:5000/users/forget", { email: mail })
      .then((res) => {
        alert("check your email");
        navigate("/signin");
      })
      .catch((err) => {
        alert("incorrect email");
      });
  };
  return (
    <div>
      <br></br>
      <br></br>
      <TextField
        input
        margin="normal"
        id="outlined-basic"
        label="Enter your Email"
        variant="outlined"
        onChange={handleMail}
      />
      <br></br>
      <br></br>
      <Button variant="contained" onClick={handleReset}>
        Reset Password
      </Button>
    </div>
  );
}
