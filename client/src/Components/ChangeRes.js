import { useNavigate } from "react-router-dom";
import ReservationsTable from "../cancel/ReservationsTable2";
import { useLocation } from "react-router-dom";
import DatePicker from "../homepage/DatePicker";
import Dropdown from "../homepage/DropDown";
import axios from "axios";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AlertTitle from "@mui/material/AlertTitle";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Collapse from "@mui/material/Collapse";
import React, { useEffect } from "react";
export default function ChangeReservation() {
  const { state } = useLocation();
  const {
    id,
    Confirmation_Number,
    price,
    Dep_Flight_id,
    Dep_eSeats,
    Dep_bSeats,
    Dep_fSeats,
    Arr_Flight_id,
    Arr_eSeats,
    Arr_bSeats,
    Arr_fSeats,
  } = state;
  const [cabinError, setCabinError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [value, setValue] = React.useState(new Date(2018, 11, 24));
  const navigate = useNavigate();
  var cab = "";

  function formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var st = "" + day + "-" + month + "-" + year;
    return st;
  }

  const handleDep = async () => {
    var temp = Dep_eSeats.length + Dep_bSeats.length + Dep_fSeats.length;
    if (cab === "") {
      setCabinError(true);
      setOpen(true);
      setAlert(true);
    }
    if (value === null) {
      setDateError(true);
      setOpen(true);
      setAlert(true);
    } else {
      var res0 = await axios
        .get("http://localhost:5000/flights/" + Dep_Flight_id)
        .catch((err) => {
          console.log(err);
        });

      var formatedDate = formatDate(value);
      var queryData = {
        From: res0.data.From,
        To: res0.data.To,
        DepartureDate: formatedDate,
      };
          
      var res = await axios
        .post("http://localhost:5000/flights/search/dep", queryData)
        .catch((err) => {
          console.log(err);
        });
      if (res.status === 204) {
        setWarning(true);
        setOpen(true);
      } else {
        console.log(res.data.departure);
        let formatedData = {
          id: id,
          departure: res.data.departure,
          cabin: cab,
          price: price,
          seats: temp,
        };

        navigate("/h/changedep", { state: formatedData }); //TODO: need to fix path
      }
    }
  };
  const handleArr = async () => {
    var temp = Arr_eSeats.length + Arr_bSeats.length + Arr_fSeats.length;
    if (cab === "") {
      setCabinError(true);
      setOpen(true);
      setAlert(true);
    }
    if (value === null) {
      setOpen(true);
      setDateError(true);
      setAlert(true);
    } else {
      var res0 = await axios
        .get("http://localhost:5000/flights/" + Arr_Flight_id)
        .catch((err) => {
          console.log(err);
        });

      var formatedDate = formatDate(value);
      var queryData = {
        From: res0.data.From,
        To: res0.data.To,
        ReturnDate: formatedDate,
      };
      var res = await axios
        .post("http://localhost:5000/flights/search/arr", queryData)
        .catch((err) => {
          console.log(err);
        });
      if (res.status === 204) {
        setWarning(true);
        setOpen(true);
      } else {
        let formatedData = {
          id: id,
          arrival: res.data.arrival,
          cabin: cab,
          price: price,
          seats: temp,
        };

        navigate("/h/changearr", { state: formatedData }); //TODO: need to fix path
      }
    }
  };
  const handleSeat = async () => {
    var temp = Arr_eSeats.length + Arr_bSeats.length + Arr_fSeats.length;
    let formatedData = {
      id: id,
      Confirmation_Number: Confirmation_Number,
      departure: Dep_Flight_id,
      arrival: Arr_Flight_id,
      cabin: cab,
      seats: temp,
    };

    navigate("/h/changeseats", { state: formatedData });
  };
  const cabin = (data) => {
    cab = data;
  };
  const handleChange = (data) => {
    setValue(data);
  };

  return (
    <div>
      <ReservationsTable rows={[state]} />
      <div>
        <div>
          <div style={{ width: "25%" }}>
            <Dropdown func={cabin} error={cabinError} />
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="yyyy/MM/dd"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
        </div>
        <Button
          variant="contained"
          onClick={handleDep}
          style={{ marginLeft: "5px" }}
        >
          Change Departure Flight
        </Button>{" "}
        <Button
          variant="contained"
          onClick={handleArr}
          style={{ marginLeft: "5px" }}
        >
          Change return Flight
        </Button>{" "}
        <Button
          variant="contained"
          onClick={handleSeat}
          style={{ marginLeft: "5px" }}
        >
          Change Seat
        </Button>{" "}
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Collapse in={alert}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setOpen(!open);
              setAlert(false);
              setDateError(false);
              setCabinError(false);
            }}
          >
            <AlertTitle>Error</AlertTitle>
            <strong>Please Enter valid data</strong>
          </Alert>
        </Collapse>
        <Collapse in={warning}>
          <Alert
            variant="filled"
            severity="warning"
            onClose={() => {
              setOpen(!open);
              setWarning(false);
            }}
          >
            <AlertTitle>Warning</AlertTitle>
            <strong>No avaliable flights matching</strong>
          </Alert>
        </Collapse>
      </Backdrop>
    </div>
  );
}
