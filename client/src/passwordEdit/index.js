import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export default function Password(props) {
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

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
        localStorage.removeItem("token");
        setAlert(true);
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
      <Collapse
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          size: "auto",
          height: "15px",
          content: "center",
          textAlign: "center",
          //center children
          justifyContent: "center",
          alignItems: "center",
          
        }}
        in={alert}
      >
        <Alert
          style={{
            width: "50%",
            //center
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            //center children
            textAlign: "center",
            //parent center
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="filled"
          onClose={() => {
            navigate("/h/login", { replace: true });
          }}
        >
          <AlertTitle style={{}}>Success</AlertTitle>
          <strong>Password Changed Successfully</strong>
        </Alert>
      </Collapse>
    </div>
  );
}
