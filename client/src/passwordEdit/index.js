import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function Password() {
  const [Password, setPassword] = useState("");
  const [old, setOld] = useState("");

  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const handleOld = (event) => {
    setOld(event.target.value);
  };
  const handleClick = () => {
    axios({
      method: "post", //you can set what request you want to be
      url: "http://localhost:5000/users/password",
      data: { password: Password, old: old },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="form-group">
        <TextField
          input
          margin="normal"
          type="password"
          id="outlined-basic"
          label="Enter your password"
          variant="outlined"
          onChange={handleOld}
        />
      </div>
      <div className="form-group">
        <TextField
          input
          margin="normal"
          type="password"
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          onChange={handlePass}
        />
      </div>
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}
