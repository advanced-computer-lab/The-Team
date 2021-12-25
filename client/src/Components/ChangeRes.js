import { useNavigate } from "react-router-dom";
import ReservationsTable from "../cancel/ReservationsTable";
import { useLocation } from "react-router-dom";
import DatePicker from "../homepage/DatePicker";
import Dropdown from "../homepage/DropDown";
import axios from "axios";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
export default function ChangeReservation() {
  const { state } = useLocation();
  const {
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
  const [dateError, setDateError] = React.useState(false);
  const navigate = useNavigate();
  var cab = "";
  var date = [];

  const getDate = (data) => {
    date = data;
  };
  function formatDate(date) {
    var returnDate = [];
    for (const d of date) {
      var day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var st = "" + year + "-" + month + "-" + day;
      returnDate.push(st);
    }
    return returnDate;
  }
  const handleDep = async (event) => {
    var temp = Dep_eSeats.length + Dep_bSeats.length + Dep_fSeats.length;
    if (cab === "") {
      setCabinError(true);
    } else {
      var res0 = await axios
        .get("http://localhost:5000/flights/" + Dep_Flight_id)
        .catch((err) => {
          console.log(err);
        });

      var formatedDate = formatDate(date);
      var queryData = {
        From: res0.data.From,
        To: res0.data.To,
        cabin: cab,
        DepartureDate: formatedDate[0],
        ReturnDate: formatedDate[1],
      };
      var res = await axios
        .post("http://localhost:5000/flights/search", queryData)
        .catch((err) => {
          console.log(err);
        });
      if (res.status === 204) {
      } else {
        let formatedData = {
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
    } else {
      var res0 = await axios
        .get("http://localhost:5000/flights/" + Arr_Flight_id)
        .catch((err) => {
          console.log(err);
        });

      var formatedDate = formatDate(date);
      var queryData = {
        From: res0.data.From,
        To: res0.data.To,
        cabin: cab,
        DepartureDate: formatedDate[0],
        ReturnDate: formatedDate[1],
      };
      var res = await axios
        .post("http://localhost:5000/flights/search", queryData)
        .catch((err) => {
          console.log(err);
        });
      if (res.status === 204) {
      } else {
        let formatedData = {
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
      departure:Dep_Flight_id,
      arrival: Arr_Flight_id,
      cabin: cab,
      seats: temp,
    };

    navigate("/h/changeseats", { state: formatedData });
  };
  const cabin = (data) => {
    cab = data;
  };

  return (
    <div>
      <ReservationsTable rows={[state]} />
      <div>
        <div>
          <div style={{ width: "25%" }}>
            <Dropdown func={cabin} error={cabinError} />
          </div>
          <DatePicker func={getDate} error={dateError} />
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
    </div>
  );
}
