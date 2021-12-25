import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";


export default function Forget() {
  const [mail, setMail] = useState("");

  const handleMail = (event) => {
    setMail(event.target.value);
  };
  const handleReset = () => {
      axios.post("http://localhost:5000/users/forget", {email: mail})

  }
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
