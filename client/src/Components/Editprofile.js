import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Editprofile(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Passport_number, setPassport_number] = useState("");
  const [Email, setEmail] = useState("");
  const [Home_address, setHome_address] = useState("");
  const [Country_code, setCountry_code] = useState("");
  const [Telephone_number, setTelephone_number] = useState("");

  const { state } = useLocation();
  const { id } = state;

  const handlePass = (event) => {
    setPassword(event.target.value);
  };
  const handleUser = (event) => {
    setUsername(event.target.value);
  };
  const handleLast = (event) => {
    setLname(event.target.value);
  };
  const handleFirst = (event) => {
    setFname(event.target.value);
  };
  const handlePassport = (event) => {
    setPassport_number(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleAddress = (event) => {
    setHome_address(event.target.value);
  };
  const handleCountry = (event) => {
    setCountry_code(event.target.value);
  };
  const handlePhone = (event) => {
    setTelephone_number(event.target.value);
  };

  const onSubmit = () => {
    console.log(id);
    console.log(Username);

    const data = {
      id: id,
      Username: Username,
      Password: Password,
      Email: Email,
      Passport_number: Passport_number,
      Fname: Fname,
      Lname: Lname,
      Home_address: Home_address,
      Country_code: Country_code,
      Telephone_number: Telephone_number,
    };



    axios({
      method: "patch", //you can set what request you want to be
      url: "http://localhost:5000/users/update",
      data:data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })

    .then(res=>{
      console.log("success")
      alert("User info updated successfully");
    })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Editprofile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
            <h1
              style={{
                color: "rgb(51,51,51)",
              }}
            >
              Edit Profile
            </h1>
          </div>
        </div>

        <div
          className="col-md-8 m-auto"
          style={{
            display: "flex",
            gap: 24,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            noValidate
            onSubmit={onSubmit}
            style={{
              display: "grid",
              border: "1px solid grey",
              padding: "24px 12px",
              borderRadius: 12,
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              background: "white",
              gridTemplateColumns: "300px 300px",
              gap: 12,
            }}
          >
            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={handleUser}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handlePass}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={handleFirst}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={handleLast}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Passport Number"
                variant="outlined"
                onChange={handlePassport}
              />
            </div>
            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={handleEmail}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Home Address"
                variant="outlined"
                onChange={handleAddress}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Country Code"
                variant="outlined"
                onChange={handleCountry}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Telephone Number"
                onChange={handlePhone}
                variant="outlined"
                style={{
                  color: "red",
                }}
              />
            </div>
          </form>
          <Button onClick={onSubmit} variant="contained">
            submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
