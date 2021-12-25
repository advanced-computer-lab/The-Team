import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CreateFlight(props) {
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Dep_date, setDep_date] = useState("");
  const [Arr_date, setArr_date] = useState("");
  const [Dep_time, setDep_time] = useState("");
  const [Arr_time, setArr_time] = useState("");
  const [Economy_seats, setEconomy_seats] = useState("");
  const [Business_seats, setBusiness_seats] = useState("");
  const [First_seats, setFirst_seats] = useState("");
  const [Flight_no, setFlight_no] = useState("");
  const [Baggage_allowance, setBaggage_allowance] = useState("");
  const [Price, setPrice] = useState("");
  const [Dep_terminal, setDep_terminal] = useState("");
  const [Arr_terminal, setArr_terminal] = useState("");
  const [Trip_duration, setTrip_duration] = useState("");


  const handleFrom = (event) => {
    setFrom(event.target.value);
  };
  const handleTo = (event) => {
    setTo(event.target.value);
  };
  const handleDep_date = (event) => {
    setDep_date(event.target.value);
  };
  const handleArr_date = (event) => {
    setArr_date(event.target.value);
  };
  const handleDep_time = (event) => {
    setDep_time(event.target.value);
  };
  const handleArr_time = (event) => {
    setArr_time(event.target.value);
  };
  const handleEconomy = (event) => {
    setEconomy_seats(event.target.value);
  };
  const handleBusiness = (event) => {
    setBusiness_seats(event.target.value);
  };
  const handleFirst = (event) => {
    setFirst_seats(event.target.value);
  };
  const handleFlightno = (event) => {
    setFlight_no(event.target.value);
  };
  const handleBaggage = (event) => {
    setBaggage_allowance(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleDep_terminal = (event) => {
    setDep_terminal(event.target.value);
  };
  const handleArr_terminal = (event) => {
    setArr_terminal(event.target.value);
  };
  const handleDuration = (event) => {
    setTrip_duration(event.target.value);
  };

  const onSubmit = () => {


    const data = {
      From: From,
      To: To,
      Dep_date: Dep_date,
      Arr_date: Arr_date,
      Dep_time: Dep_time,
      Arr_time: Arr_time,
      Economy_seats: Economy_seats,
      Business_seats: Business_seats,
      First_seats: First_seats,
      Flight_no: Flight_no,
      Baggage_allowance: Baggage_allowance,
      Price: Price,
      Dep_terminal: Dep_terminal,
      Arr_terminal:Arr_terminal ,
      Trip_duration:  Trip_duration,
    }


    axios
    .post('http://localhost:5000/flights/add', data)

    .then(res=>{
      console.log("success")
      alert("flight added successfully");
    })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="AddFlight">
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
              Create Flight
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
                label="From"
                variant="outlined"
                onChange={handleFrom}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="To"
                variant="outlined"
                onChange={handleTo}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Dep date"
                variant="outlined"
                onChange={handleDep_date}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Arr date"
                variant="outlined"
                onChange={handleArr_date}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Dep Time"
                variant="outlined"
                onChange={handleDep_time}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Arr Time"
                variant="outlined"
                onChange={handleArr_time}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Economy"
                variant="outlined"
                onChange={handleEconomy}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Business"
                variant="outlined"
                onChange={handleBusiness}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="First"
                variant="outlined"
                onChange={handleFirst}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Flightno"
                variant="outlined"
                onChange={handleFlightno}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Baggage allowance"
                variant="outlined"
                onChange={handleBaggage}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                onChange={handlePrice}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Dep_terminal"
                variant="outlined"
                onChange={handleDep_terminal}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Arr_terminal"
                variant="outlined"
                onChange={handleArr_terminal}
              />
            </div>

            <div className="form-group">
              <TextField
                id="outlined-basic"
                label="Trip_duration"
                variant="outlined"
                onChange={handleDuration}
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

export default CreateFlight;
